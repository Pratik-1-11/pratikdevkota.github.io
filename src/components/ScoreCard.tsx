import React from 'react';
import { TeamScore } from '../types/cricket';
import { TrendingUp, Target, Clock3 } from 'lucide-react';

interface ScoreCardProps {
  score: TeamScore;
  matchState: MatchState;
  teamName: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, matchState, teamName }) => {
  const runRate = score.overs > 0 ? (score.runs / score.overs).toFixed(2) : '0.00';
  const projectedScore = Math.round(score.runs * (matchState.totalOvers / score.overs));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{teamName}</h2>
        <span className="px-3 py-1 rounded-full text-sm font-semibold
          ${matchState.status === 'inProgress' ? 'bg-green-100 text-green-800' :
          matchState.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'}">
          {matchState.status.charAt(0).toUpperCase() + matchState.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-4xl font-bold text-gray-900">
          {score.runs}/{score.wickets}
        </div>
        <div className="text-right">
          <div className="text-2xl text-gray-700">
            {Math.floor(score.overs)}.{score.balls} ov
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>RR: {runRate}</span>
        </div>
        <div className="flex items-center">
          <Target className="w-4 h-4 mr-1" />
          <span>Proj: {projectedScore}</span>
        </div>
        <div className="flex items-center">
          <Clock3 className="w-4 h-4 mr-1" />
          <span>Rem: {matchState.totalOvers - score.overs}</span>
        </div>
      </div>
    </div>
  );
};