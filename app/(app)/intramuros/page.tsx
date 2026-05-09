"use client";

import Spinner from "@/components/shared/Spinner";
import { listStudentIntramuralTournaments } from "@/services/intramurals/intramuralStudentApi";
import Link from "next/link";
import useSWR from "swr";

export default function StudentIntramuralsPage() {
  const {
    data: tournaments,
    error,
    isLoading,
  } = useSWR("/intramurals/student/tournaments", listStudentIntramuralTournaments);

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-800">Intramuros</h1>
        <p className="text-gray-600 mt-1">
          Consulta torneos activos y registra tu equipo.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-red-600 font-semibold">
            Error al cargar los torneos de Intramuros.
          </p>
        </div>
      ) : tournaments && tournaments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {tournaments.map((tournament) => (
            <Link
              key={tournament.id}
              href={`/intramuros/${tournament.id}`}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <p className="font-semibold text-blue-800">
                {tournament.sport.name}
              </p>
              <p className="text-gray-800 mt-1">{tournament.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {tournament.semester} · {tournament.status}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No hay torneos publicados.</p>
        </div>
      )}
    </main>
  );
}
