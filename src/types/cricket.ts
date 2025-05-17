export interface Player {
  id: string;
  name: string;
  team: 'home' | 'away';
  role: 'batsman' | 'bowler' | 'all-rounder';
  battingOrder?: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface BatsmanStats {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

export interface BowlerStats {
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface Extra {
  type: 'wide' | 'noBall' | 'legBye' | 'bye';
  runs: number;
  additionalRuns: number;
}

export interface Partnership {
  runs: number;
  balls: number;
  batsman1: string;
  batsman2: string;
}

export interface TossResult {
  winner: Team;
  choice: 'bat' | 'bowl';
}

export interface MatchState {
  status: 'scheduled' | 'inProgress' | 'completed';
  currentInnings: 1 | 2;
  totalOvers: number;
  target?: number;
  team1: Team;
  team2: Team;
  battingTeam: Team;
  bowlingTeam: Team;
  toss?: TossResult;
}

export interface TeamScore {
  runs: number;
  wickets: number;
  overs: number;
  balls: number;
  extras: Extra[];
  currentBatsmen: [string, string];
  currentBowler: string;
  bowlerStats: Record<string, BowlerStats>;
}