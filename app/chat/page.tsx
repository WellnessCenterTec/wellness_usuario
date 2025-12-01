"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import clienteAxios from "@/config/clienteAxios";

type ChatSender = "USER" | "ADMIN" | "BOT";

type ChatMessage = {
  id: number;
  conversationId: number;
  sender: ChatSender;
  text: string;
  createdAt: string | Date;
};

type MessagesResponse = {
  conversationId: number | null;
  messages: ChatMessage[];
};

type PublicSessionResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    registration: string;
  };
};

export default function ChatUsuarioPage() {
  // Authentication state
  const [chatToken, setChatToken] = useState<string | null>(null);
  const [userMeta, setUserMeta] = useState<PublicSessionResponse['user'] | null>(null);
  const [registration, setRegistration] = useState("");
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const sinceIdRef = useRef(0);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  // Create auth config from chat token
  const authConfig = useMemo(() => {
    return chatToken ? { headers: { Authorization: `Bearer ${chatToken}` } } : null;
  }, [chatToken]);

  // Auto-scroll al final cuando cambian los mensajes
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle registration submission
  async function handleRegistration(e: React.FormEvent) {
    e.preventDefault();
    const cleanRegistration = registration.trim();
    if (!cleanRegistration) return;

    try {
      setLoadingRegistration(true);
      setRegistrationError("");

      const { data } = await clienteAxios.post<PublicSessionResponse>(
        "/chat/public/session",
        { registration: cleanRegistration }
      );

      setChatToken(data.token);
      setUserMeta(data.user);
    } catch (error: any) {
      const message = error?.response?.data?.msg || "Error validando matrícula";
      setRegistrationError(message);
    } finally {
      setLoadingRegistration(false);
    }
  }

  // Cargar mensajes iniciales y activar polling cuando hay token
  useEffect(() => {
    if (!chatToken || !authConfig) return;

    let mounted = true;

    async function loadInitial() {
      if (!authConfig) return;
      
      try {
        setLoading(true);

        const { data } = await clienteAxios.get<MessagesResponse>(
          "/chat/user/messages",
          authConfig
        );

        if (!mounted) return;
        setConversationId(data.conversationId);
        setMessages(data.messages);
        if (data.messages?.length) {
          sinceIdRef.current = data.messages[data.messages.length - 1].id;
        }
      } catch {
        // Silencioso
      } finally {
        setLoading(false);
      }
    }

    loadInitial();

    // Polling
    pollRef.current = setInterval(async () => {
      if (!authConfig) return;
      
      try {
        const params =
          sinceIdRef.current > 0 ? { params: { sinceId: sinceIdRef.current } } : {};
        const { data } = await clienteAxios.get<MessagesResponse>(
          "/chat/user/messages",
          { ...authConfig, ...params }
        );

        if (!mounted) return;

        if (data.conversationId !== null && data.conversationId !== conversationId) {
          setConversationId(data.conversationId);
        }
        if (data.messages?.length) {
          setMessages((prev) => {
            const next = [...prev, ...data.messages];
            // Actualizar sinceId con el último recibido
            sinceIdRef.current =
              data.messages[data.messages.length - 1]?.id ?? sinceIdRef.current;
            return next;
          });
        }
      } catch {
        // Silencioso
      }
    }, 3000);

    return () => {
      mounted = false;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [chatToken, authConfig, conversationId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || !authConfig) return;

    try {
      setSending(true);

      const { data } = await clienteAxios.post<{
        conversationId: number;
        messages: ChatMessage[];
      }>("/chat/user/send", { text }, authConfig);

      // El backend devuelve los mensajes nuevos (usuario y bot/aviso)
      setConversationId(data.conversationId);
      setMessages((prev) => {
        const merged = [...prev, ...data.messages];
        if (data.messages?.length) {
          sinceIdRef.current =
            data.messages[data.messages.length - 1].id ?? sinceIdRef.current;
        }
        return merged;
      });
      setInput("");
    } catch {
      // Silencioso; se podría mostrar un toast
    } finally {
      setSending(false);
    }
  }

  function bubbleClasses(sender: ChatSender) {
    switch (sender) {
      case "USER":
        return "bg-blue-600 text-white";
      case "ADMIN":
        return "bg-emerald-600 text-white";
      case "BOT":
      default:
        return "bg-gray-200 text-gray-900";
    }
  }

  function rowAlign(sender: ChatSender) {
    return sender === "USER" ? "justify-end" : "justify-start";
  }

  function senderLabel(sender: ChatSender) {
    if (sender === "USER") return "Tú";
    if (sender === "ADMIN") return "Admin";
    return "Bot";
    }

  // If no chat token, show registration form
  if (!chatToken) {
    return (
      <div className="h-full min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center bg-slate-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Centro de Bienestar</h1>
            <p className="text-sm text-gray-500 mt-2">
              Ingresa tu matrícula para acceder al chat de soporte
            </p>
          </div>

          <form onSubmit={handleRegistration} className="space-y-4">
            <div>
              <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-1">
                Matrícula
              </label>
              <input
                id="registration"
                type="text"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                placeholder="Ej: A01234567"
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={20}
                required
              />
            </div>

            {registrationError && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {registrationError}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingRegistration || !registration.trim()}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingRegistration ? "Validando..." : "Continuar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Chat interface with authenticated user
  return (
    <div className="h-full min-h-[calc(100vh-4rem)] w-full flex flex-col">
      <header className="px-4 py-3 border-b bg-white/60 backdrop-blur sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Soporte</h1>
        <p className="text-sm text-gray-500">
          Hola, <span className="font-medium">{userMeta?.name}</span> ({userMeta?.registration}).
          Envía tu mensaje y nuestro asistente te ayudará.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {loading && !messages.length ? (
          <p className="text-center text-gray-500">Cargando conversación...</p>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>Aún no hay mensajes. Comienza la conversación 👋</p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`w-full flex ${rowAlign(m.sender)}`}>
              <div className="max-w-[80%] space-y-1">
                <div className={`px-3 py-2 rounded-2xl shadow-sm ${bubbleClasses(m.sender)}`}>
                  <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                </div>
                <div className="text-[11px] text-gray-500 px-1">{senderLabel(m.sender)}</div>
              </div>
            </div>
          ))
        )}
        <div ref={listEndRef} />
      </main>

      <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={800}
        />
        <button
          type="submit"
          disabled={sending || input.trim().length === 0}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}