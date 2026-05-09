export interface StudentIntramuralSport {
  id: number;
  name: string;
  active: boolean;
}

export interface StudentIntramuralTournament {
  id: number;
  name: string;
  semester: string;
  status: string;
  sport: StudentIntramuralSport;
}

export interface StudentIntramuralMatch {
  id: number;
  startTime: string;
  endTime: string;
  scoreA?: number | null;
  scoreB?: number | null;
  status: string;
  venue: { name: string };
  group?: { name: string } | null;
  teamA: { name: string; branch: string };
  teamB: { name: string; branch: string };
}

export interface StudentIntramuralSanction {
  id: number;
  sport: string;
  team: string;
  name: string;
  gamesRemaining: number;
}
