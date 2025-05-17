import React from 'react';
import { BowlerStats } from '../types/cricket';

interface BowlerCardProps {
  name: string;
  stats: BowlerStats;
  isCurrent: boolean;
}

export const BowlerCard: React.FC<BowlerCardProps> = ({ name, stats, isCurrent }) => {
  return (
    <div className={`flex items-center justify-between p-3 ${isCurrent ? 'bg-blue-50' : 'bg-white'} rounded-lg mb-2`}>
      <div className="flex items-center">
        <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-blue-500' : 'bg-gray-300'} mr-2`}></span>
        <span className="font-medium">{name}</span>
      </div>
      <div className="grid grid-cols-5 gap-4 text-sm">
        <span>{stats.overs}.{stats.balls}</span>
        <span>{stats.maidens}</span>
        <span>{stats.runs}</span>
        <span>{stats.wickets}</span>
        <span>{stats.economy.toFixed(2)}</span>
      </div>
    </div>
  );
};