import React from 'react';
import { Team } from '../types/cricket';
import { CoinsIcon } from 'lucide-react';

interface TossSelectorProps {
  team1: Team;
  team2: Team;
  onTossComplete: (winner: Team, choice: 'bat' | 'bowl') => void;
}

export const TossSelector: React.FC<TossSelectorProps> = ({ team1, team2, onTossComplete }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CoinsIcon className="w-6 h-6" />
        Toss
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Toss Winner
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedTeam(team1)}
              className={`p-3 border rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 ${
                selectedTeam === team1 ? 'bg-blue-50 border-blue-500' : ''
              }`}
            >
              {team1.name}
            </button>
            <button
              onClick={() => setSelectedTeam(team2)}
              className={`p-3 border rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 ${
                selectedTeam === team2 ? 'bg-blue-50 border-blue-500' : ''
              }`}
            >
              {team2.name}
            </button>
          </div>
        </div>

        {selectedTeam && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedTeam.name} chose to
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onTossComplete(selectedTeam, 'bat')}
                className="p-3 border rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-200"
              >
                Bat
              </button>
              <button
                onClick={() => onTossComplete(selectedTeam, 'bowl')}
                className="p-3 border rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-200"
              >
                Bowl
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};