import React, { useState } from 'react';
import { ScoreCard } from './components/ScoreCard';
import { BatsmanCard } from './components/BatsmanCard';
import { BowlerCard } from './components/BowlerCard';
import { AdminControls } from './components/AdminControls';
import { TeamSetup } from './components/TeamSetup';
import { TossSelector } from './components/TossSelector';
import { BrickWallIcon as CricketBallIcon, ShieldIcon } from 'lucide-react'import { Team, Player, MatchState, TeamScore, TossResult } from './types/cricket';

function createInitialTeam(name: string): Team {
  return {
    id: crypto.randomUUID(),
    name,
    players: Array.from({ length: 11 }, (_, i) => ({
      id: crypto.randomUUID(),
      name: `Player ${i + 1}`,
      team: 'home',
      role: 'batsman',
      battingOrder: i + 1,
    })),
  };
}

function App() {
  const [isAdmin] = useState(true);
  const [isSetup, setIsSetup] = useState(true);
  const [isToss, setIsToss] = useState(true);
  const [team1, setTeam1] = useState<Team>(createInitialTeam('Team 1'));
  const [team2, setTeam2] = useState<Team>(createInitialTeam('Team 2'));
  
  const [matchState, setMatchState] = useState<MatchState>({
    status: 'inProgress',
    currentInnings: 1,
    totalOvers: 20,
    team1,
    team2,
    battingTeam: team1,
    bowlingTeam: team2,
  });

  const [score, setScore] = useState<TeamScore>({
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    extras: [],
    currentBatsmen: [team1.players[0].name, team1.players[1].name],
    currentBowler: team2.players[0].name,
    bowlerStats: {},
  });

  const [history, setHistory] = useState<TeamScore[]>([score]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleTossComplete = (winner: Team, choice: 'bat' | 'bowl') => {
    const toss: TossResult = { winner, choice };
    const battingTeam = choice === 'bat' ? winner : (winner.id === team1.id ? team2 : team1);
    const bowlingTeam = choice === 'bowl' ? winner : (winner.id === team1.id ? team2 : team1);
    
    setMatchState({
      ...matchState,
      battingTeam,
      bowlingTeam,
      toss,
    });
    
    setScore({
      ...score,
      currentBatsmen: [battingTeam.players[0].name, battingTeam.players[1].name],
      currentBowler: bowlingTeam.players[0].name,
    });
    
    setIsToss(false);
  };

  const handleRunsAdd = (runs: number, isExtra: boolean) => {
    const newScore = { ...score };
    newScore.runs += runs;
    if (!isExtra) {
      newScore.balls += 1;
      if (newScore.balls === 6) {
        newScore.overs += 1;
        newScore.balls = 0;
      }
      // Update bowler stats
      const bowlerStats = newScore.bowlerStats[newScore.currentBowler] || {
        overs: 0,
        balls: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        economy: 0,
      };
      bowlerStats.runs += runs;
      bowlerStats.balls = (bowlerStats.balls + 1) % 6;
      if (bowlerStats.balls === 0) bowlerStats.overs++;
      bowlerStats.economy = (bowlerStats.runs / (bowlerStats.overs + bowlerStats.balls/6));
      newScore.bowlerStats[newScore.currentBowler] = bowlerStats;
    }
    updateScore(newScore);
  };

  const handleExtra = (type: string, runs: number, additionalRuns: number) => {
    const newScore = { ...score };
    newScore.runs += runs + additionalRuns;
    newScore.extras.push({ 
      type: type as any, 
      runs,
      additionalRuns 
    });
    // Only increment balls for no-balls
    if (type === 'noBall') {
      newScore.balls += 1;
      if (newScore.balls === 6) {
        newScore.overs += 1;
        newScore.balls = 0;
      }
    }
    // Update bowler stats
    const bowlerStats = newScore.bowlerStats[newScore.currentBowler] || {
      overs: 0,
      balls: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
      economy: 0,
    };
    bowlerStats.runs += runs + additionalRuns;
    if (type === 'noBall') {
      bowlerStats.balls = (bowlerStats.balls + 1) % 6;
      if (bowlerStats.balls === 0) bowlerStats.overs++;
    }
    bowlerStats.economy = (bowlerStats.runs / (bowlerStats.overs + bowlerStats.balls/6));
    newScore.bowlerStats[newScore.currentBowler] = bowlerStats;
    updateScore(newScore);
  };

  const handleWicket = () => {
    const newScore = { ...score };
    newScore.wickets += 1;
    newScore.balls += 1;
    if (newScore.balls === 6) {
      newScore.overs += 1;
      newScore.balls = 0;
    }
    // Update bowler stats
    const bowlerStats = newScore.bowlerStats[newScore.currentBowler] || {
      overs: 0,
      balls: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
      economy: 0,
    };
    bowlerStats.wickets += 1;
    bowlerStats.balls = (bowlerStats.balls + 1) % 6;
    if (bowlerStats.balls === 0) bowlerStats.overs++;
    bowlerStats.economy = (bowlerStats.runs / (bowlerStats.overs + bowlerStats.balls/6));
    newScore.bowlerStats[newScore.currentBowler] = bowlerStats;
    updateScore(newScore);
  };

  const updateScore = (newScore: TeamScore) => {
    setScore(newScore);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newScore);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setScore(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setScore(history[historyIndex + 1]);
    }
  };

  const handleStartMatch = () => {
    setIsSetup(false);
  };

  if (isSetup) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cricket className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Cricket Scorer</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Team 1</h2>
              <TeamSetup team={team1} onUpdateTeam={setTeam1} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Team 2</h2>
              <TeamSetup team={team2} onUpdateTeam={setTeam2} />
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={handleStartMatch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Continue to Toss
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (isToss) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cricket className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Cricket Scorer</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <TossSelector
            team1={team1}
            team2={team2}
            onTossComplete={handleTossComplete}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cricket className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Cricket Scorer</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span className="text-sm">Admin Mode</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4">
          <p className="text-sm text-gray-600">
            {matchState.toss?.winner.name} won the toss and chose to {matchState.toss?.choice} first
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ScoreCard
              score={score}
              matchState={matchState}
              teamName={matchState.battingTeam.name}
            />
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <h3 className="text-lg font-semibold mb-4">Batting</h3>
              <div className="grid grid-cols-7 gap-4 text-sm text-gray-600 mb-2">
                <div className="col-span-2">Batter</div>
                <div>R</div>
                <div>B</div>
                <div>4s</div>
                <div>6s</div>
                <div>SR</div>
              </div>
              {matchState.battingTeam.players.slice(0, 2).map((player, index) => (
                <BatsmanCard
                  key={player.id}
                  name={player.name}
                  stats={{
                    runs: 0,
                    balls: 0,
                    fours: 0,
                    sixes: 0,
                    strikeRate: 0
                  }}
                  onStrike={index === 0}
                />
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Bowling</h3>
              <div className="grid grid-cols-6 gap-4 text-sm text-gray-600 mb-2">
                <div className="col-span-2">Bowler</div>
                <div>O</div>
                <div>M</div>
                <div>R</div>
                <div>W</div>
                <div>Econ</div>
              </div>
              {Object.entries(score.bowlerStats).map(([bowlerName, stats]) => (
                <BowlerCard
                  key={bowlerName}
                  name={bowlerName}
                  stats={stats}
                  isCurrent={bowlerName === score.currentBowler}
                />
              ))}
            </div>
          </div>

          {isAdmin && (
            <div>
              <AdminControls
                onRunsAdd={handleRunsAdd}
                onExtra={handleExtra}
                onWicket={handleWicket}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onSelectBowler={(bowlerId) => {
                  const bowler = matchState.bowlingTeam.players.find(p => p.id === bowlerId);
                  if (bowler) {
                    setScore({ ...score, currentBowler: bowler.name });
                  }
                }}
                availableBowlers={matchState.bowlingTeam.players.filter(
                  p => p.role === 'bowler' || p.role === 'all-rounder'
                )}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;