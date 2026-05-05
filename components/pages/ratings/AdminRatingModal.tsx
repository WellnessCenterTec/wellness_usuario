"use client";

import { Modal } from "@/components/UI/Modal";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import { RateableAdminInt } from "@/styles/ModelTypes";
import { handleError } from "@/utils/errorHandler";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";

interface Props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ratingFetcher = (url: string) =>
  clienteAxios(url, axiosConfig() ?? {}).then((response) => response.data);

export default function AdminRatingModal({ active, setActive }: Props) {
  const { data: admins, mutate } = useSWR<RateableAdminInt[]>(
    active ? "/user/rateable-admins" : null,
    ratingFetcher
  );
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const selectedAdmin = useMemo(
    () => admins?.find((admin) => admin.id === selectedAdminId) ?? null,
    [admins, selectedAdminId]
  );

  useEffect(() => {
    if (admins && admins.length > 0 && !selectedAdminId) {
      setSelectedAdminId(admins[0].id);
    }
  }, [admins, selectedAdminId]);

  useEffect(() => {
    if (!selectedAdmin) {
      setRating(0);
      setComment("");
      return;
    }

    setRating(selectedAdmin.myRating ?? 0);
    setComment(selectedAdmin.myComment ?? "");
  }, [selectedAdmin]);

  async function handleSubmit() {
    if (!selectedAdminId) {
      return Swal.fire("Error", "Selecciona un administrador", "error");
    }

    if (rating < 1 || rating > 5) {
      return Swal.fire("Error", "Selecciona una calificacion", "error");
    }

    try {
      const config = axiosConfig();
      if (!config) {
        throw new Error("Sesion vencida");
      }

      const { data } = await clienteAxios.post(
        "/user/admin-ratings",
        {
          adminId: selectedAdminId,
          rating,
          comment,
        },
        config
      );

      await mutate();
      await Swal.fire({
        icon: "success",
        title: data.msg ?? "Calificacion guardada",
      });
      setActive(false);
    } catch (error: any) {
      return handleError(error);
    }
  }

  return (
    <Modal active={active} setActive={setActive} className="lg:w-1/2">
      <div className="text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              Calificar administrador
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Selecciona un coach y comparte tu calificacion.
            </p>
          </div>
          <button
            type="button"
            className="fa-solid fa-xmark text-gray-500"
            onClick={() => setActive(false)}
          />
        </div>

        {!admins ? (
          <p className="mt-6 text-center text-gray-600">Cargando...</p>
        ) : admins.length === 0 ? (
          <p className="mt-6 text-center text-gray-600">
            No hay administradores disponibles para calificar.
          </p>
        ) : (
          <>
            <div className="mt-5 grid max-h-60 gap-3 overflow-y-auto sm:grid-cols-2">
              {admins.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  onClick={() => setSelectedAdminId(admin.id)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left ${
                    selectedAdminId === admin.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  {admin.image ? (
                    <Image
                      src={admin.image}
                      alt={admin.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900">{admin.name}</p>
                    {admin.myRating && (
                      <p className="text-xs text-gray-500">
                        Tu calificacion actual: {admin.myRating}/5
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5">
              <p className="font-medium text-gray-800">Calificacion</p>
              <div className="mt-2 flex gap-2 text-3xl text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`${
                      star <= rating ? "fa-solid" : "fa-regular"
                    } fa-star`}
                    aria-label={`${star} estrellas`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="font-medium text-gray-800">Comentarios</label>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="mt-2 h-28 w-full rounded-md border border-gray-300 p-3 text-sm"
                placeholder="Comentario opcional"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-5 w-full rounded-md bg-blue-700 px-4 py-3 font-bold text-white"
            >
              Enviar calificacion
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
