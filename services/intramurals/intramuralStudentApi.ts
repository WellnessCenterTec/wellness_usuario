import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import {
  StudentIntramuralMatch,
  StudentIntramuralSanction,
  StudentIntramuralTournament,
} from "@/styles/IntramuralTypes";

export interface CreateStudentIntramuralTeamPayload {
  tournamentId: number;
  name: string;
  branch: string;
  captainRegistration: string;
  playerRegistrations: string[];
  acceptedTerms: boolean;
  acceptedPhotoConsent: boolean;
}

export async function listStudentIntramuralTournaments() {
  const response = await clienteAxios.get<StudentIntramuralTournament[]>(
    "/intramurals/student/tournaments",
    axiosConfig() ?? {}
  );
  return response.data;
}

export async function getStudentIntramuralSchedule(tournamentId: string) {
  const response = await clienteAxios.get<StudentIntramuralMatch[]>(
    `/intramurals/student/tournaments/${tournamentId}/schedule`,
    axiosConfig() ?? {}
  );
  return response.data;
}

export async function getStudentIntramuralSanctions(tournamentId: string) {
  const response = await clienteAxios.get<StudentIntramuralSanction[]>(
    `/intramurals/student/tournaments/${tournamentId}/sanctions`,
    axiosConfig() ?? {}
  );
  return response.data;
}

export async function createStudentIntramuralTeam(
  payload: CreateStudentIntramuralTeamPayload
) {
  const response = await clienteAxios.post(
    "/intramurals/student/teams",
    payload,
    axiosConfig() ?? {}
  );
  return response.data;
}
