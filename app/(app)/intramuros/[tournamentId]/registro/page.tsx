"use client";

import { createStudentIntramuralTeam } from "@/services/intramurals/intramuralStudentApi";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface StudentIntramuralRegistrationPageProps {
  params: { tournamentId: string };
}

interface ApiErrorResponse {
  errors?: { message?: string }[];
  msg?: string;
}

function getRegistrationErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.msg ||
      "No se pudo registrar el equipo"
    );
  }

  return "No se pudo registrar el equipo";
}

function normalizeRegistrationInput(value: string) {
  return value.trim().toUpperCase();
}

function buildPlayerRegistrations(captainRegistration: string, players: string) {
  return Array.from(
    new Set(
      [captainRegistration, ...players.split("\n")]
        .map(normalizeRegistrationInput)
        .filter(Boolean)
    )
  );
}

export default function StudentIntramuralRegistrationPage({
  params,
}: StudentIntramuralRegistrationPageProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("VARONIL");
  const [captainRegistration, setCaptainRegistration] = useState("");
  const [players, setPlayers] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPhotoConsent, setAcceptedPhotoConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const trimmedName = name.trim();
    const normalizedCaptainRegistration = normalizeRegistrationInput(captainRegistration);
    const playerRegistrations = buildPlayerRegistrations(captainRegistration, players);

    if (!trimmedName) {
      setMessage("Ingresa el nombre del equipo.");
      return;
    }
    if (!normalizedCaptainRegistration) {
      setMessage("Ingresa la matricula del capitan.");
      return;
    }
    if (!playerRegistrations.length) {
      setMessage("Agrega al menos un jugador al roster.");
      return;
    }
    if (!acceptedTerms) {
      setMessage("Debes aceptar los terminos de participacion.");
      return;
    }
    if (!acceptedPhotoConsent) {
      setMessage("Debes aceptar el uso de fotografias.");
      return;
    }

    setSubmitting(true);

    try {
      await createStudentIntramuralTeam({
        tournamentId: Number(params.tournamentId),
        name: trimmedName,
        branch,
        captainRegistration: normalizedCaptainRegistration,
        playerRegistrations,
        acceptedTerms,
        acceptedPhotoConsent,
      });
      router.push(`/intramuros/${params.tournamentId}`);
    } catch (error) {
      setMessage(getRegistrationErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <form onSubmit={submit} className="bg-white rounded-lg shadow p-5 space-y-4">
        <div>
          <Link
            href={`/intramuros/${params.tournamentId}`}
            className="text-sm text-blue-700"
          >
            Volver al torneo
          </Link>
          <h1 className="text-2xl font-bold text-blue-800 mt-1">
            Registro de equipo
          </h1>
        </div>

        <input
          className="w-full p-3 rounded border"
          placeholder="Nombre del equipo"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <select
          className="w-full p-3 rounded border"
          value={branch}
          onChange={(event) => setBranch(event.target.value)}
        >
          <option value="VARONIL">Varonil</option>
          <option value="FEMENIL">Femenil</option>
          <option value="MIXTO">Mixto</option>
          <option value="NO_APLICA">No aplica</option>
        </select>

        <input
          className="w-full p-3 rounded border"
          placeholder="Matricula del capitan"
          value={captainRegistration}
          onChange={(event) => setCaptainRegistration(event.target.value)}
        />

        <textarea
          className="w-full p-3 rounded border min-h-[180px]"
          placeholder="Una matricula por linea"
          value={players}
          onChange={(event) => setPlayers(event.target.value)}
        />

        <label className="flex gap-2 items-center text-gray-800">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
          />
          Acepto terminos de participacion
        </label>

        <label className="flex gap-2 items-center text-gray-800">
          <input
            type="checkbox"
            checked={acceptedPhotoConsent}
            onChange={(event) => setAcceptedPhotoConsent(event.target.checked)}
          />
          Acepto uso de fotografias
        </label>

        {message && <p className="text-red-600">{message}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar registro"}
        </button>
      </form>
    </main>
  );
}
