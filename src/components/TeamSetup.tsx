import React from 'react';
import { Team, Player } from '../types/cricket';

interface TeamSetupProps {
  team: Team;
  onUpdateTeam: (updatedTeam: Team) => void;
}

export const TeamSetup: React.FC<TeamSetupProps> = ({ team, onUpdateTeam }) => {
  const handlePlayerUpdate = (index: number, name: string) => {
    const updatedPlayers = [...team.players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      name,
    };
    onUpdateTeam({
      ...team,
      players: updatedPlayers,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          value={team.name}
          onChange={(e) => onUpdateTeam({ ...team, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Players</h3>
        {team.players.map((player, index) => (
          <div key={player.id} className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">{index + 1}.</span>
            <input
              type="text"
              value={player.name}
              onChange={(e) => handlePlayerUpdate(index, e.target.value)}
              placeholder={`Player ${index + 1}`}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <select
              value={player.role}
              onChange={(e) => {
                const updatedPlayers = [...team.players];
                updatedPlayers[index] = {
                  ...updatedPlayers[index],
                  role: e.target.value as 'batsman' | 'bowler' | 'all-rounder',
                };
                onUpdateTeam({ ...team, players: updatedPlayers });
              }}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="batsman">Batsman</option>
              <option value="bowler">Bowler</option>
              <option value="all-rounder">All-rounder</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};