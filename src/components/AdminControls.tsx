import React, { useState } from 'react';
import { Undo2, Redo2, Plus, Minus } from 'lucide-react';

interface AdminControlsProps {
  onRunsAdd: (runs: number, isExtra: boolean) => void;
  onExtra: (type: string, runs: number, additionalRuns: number) => void;
  onWicket: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onSelectBowler: (bowlerId: string) => void;
  availableBowlers: Player[];
}

export const AdminControls: React.FC<AdminControlsProps> = ({
  onRunsAdd,
  onExtra,
  onWicket,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onSelectBowler,
  availableBowlers
}) => {
  const [selectedExtra, setSelectedExtra] = useState('');
  const [additionalRuns, setAdditionalRuns] = useState(0);

  const handleRunsClick = (runs: number) => {
    if (selectedExtra) {
      onExtra(selectedExtra, 1, runs); // 1 is the default extra run
      setSelectedExtra('');
      setAdditionalRuns(0);
    } else {
      onRunsAdd(runs, false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between mb-6">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded ${
            canUndo ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Undo2 className="w-5 h-5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded ${
            canRedo ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Redo2 className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <select
          onChange={(e) => onSelectBowler(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2"
        >
          <option value="">Select Bowler</option>
          {availableBowlers.map((bowler) => (
            <option key={bowler.id} value={bowler.id}>
              {bowler.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          value={selectedExtra}
          onChange={(e) => setSelectedExtra(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">No Extra</option>
          <option value="wide">Wide</option>
          <option value="noBall">No Ball</option>
          <option value="legBye">Leg Bye</option>
          <option value="bye">Bye</option>
        </select>
        {selectedExtra && (
          <div className="mt-2 text-sm text-gray-600">
            Select runs scored off the {selectedExtra}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[0, 1, 2, 3, 4, 6].map((runs) => (
          <button
            key={runs}
            onClick={() => handleRunsClick(runs)}
            className={`py-3 px-4 rounded-lg font-medium ${
              selectedExtra 
                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {runs}
          </button>
        ))}
      </div>

      <button
        onClick={onWicket}
        className="w-full py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
      >
        Wicket
      </button>
    </div>
  );
};