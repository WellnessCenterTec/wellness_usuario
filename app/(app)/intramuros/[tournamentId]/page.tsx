"use client";

import Spinner from "@/components/shared/Spinner";
import {
  getStudentIntramuralSanctions,
  getStudentIntramuralSchedule,
} from "@/services/intramurals/intramuralStudentApi";
import Link from "next/link";
import useSWR from "swr";

interface StudentIntramuralTournamentPageProps {
  params: { tournamentId: string };
}

function formatMatchDate(value: string) {
  return new Date(value).toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function StudentIntramuralTournamentPage({
  params,
}: StudentIntramuralTournamentPageProps) {
  const {
    data: matches,
    error: matchesError,
    isLoading: matchesLoading,
  } = useSWR(
    `/intramurals/student/tournaments/${params.tournamentId}/schedule`,
    () => getStudentIntramuralSchedule(params.tournamentId)
  );
  const {
    data: sanctions,
    error: sanctionsError,
    isLoading: sanctionsLoading,
  } = useSWR(
    `/intramurals/student/tournaments/${params.tournamentId}/sanctions`,
    () => getStudentIntramuralSanctions(params.tournamentId)
  );

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/intramuros" className="text-sm text-blue-700">
            Volver a torneos
          </Link>
          <h1 className="text-2xl font-bold text-blue-800 mt-1">
            Intramuros
          </h1>
        </div>
        <Link
          href={`/intramuros/${params.tournamentId}/registro`}
          className="bg-blue-700 text-white px-4 py-2 rounded text-center hover:bg-blue-800 transition"
        >
          Registrar equipo
        </Link>
      </div>

      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-gray-800 mb-3">Programacion</h2>
        {matchesLoading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : matchesError ? (
          <p className="text-red-600">No se pudo cargar la programacion.</p>
        ) : (
          <div className="divide-y">
            {matches?.map((match) => (
              <div key={match.id} className="py-3">
                <p className="font-medium text-gray-900">
                  {match.teamA.name} vs {match.teamB.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {formatMatchDate(match.startTime)} · {match.venue.name} ·{" "}
                  {match.status}
                </p>
                {match.group?.name && (
                  <p className="text-xs text-gray-500 mt-1">
                    Grupo {match.group.name}
                  </p>
                )}
              </div>
            ))}
            {!matches?.length && (
              <p className="text-gray-500">No hay partidos publicados.</p>
            )}
          </div>
        )}
      </section>

      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-gray-800 mb-3">Sancionados</h2>
        {sanctionsLoading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : sanctionsError ? (
          <p className="text-red-600">No se pudieron cargar las sanciones.</p>
        ) : (
          <div className="divide-y">
            {sanctions?.map((sanction) => (
              <div key={sanction.id} className="py-3">
                <p className="font-medium text-gray-900">{sanction.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {sanction.team} · {sanction.gamesRemaining} juegos restantes
                </p>
              </div>
            ))}
            {!sanctions?.length && (
              <p className="text-gray-500">No hay sanciones activas.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
