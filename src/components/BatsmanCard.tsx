import React from 'react';
import { BatsmanStats } from '../types/cricket';

interface BatsmanCardProps {
  name: string;
  stats: BatsmanStats;
  onStrike: boolean;
}

export const BatsmanCard: React.FC<BatsmanCardProps> = ({ name, stats, onStrike }) => {
  return (
    <div className={`flex items-center justify-between p-3 ${onStrike ? 'bg-blue-50' : 'bg-white'} rounded-lg mb-2`}>
      <div className="flex items-center">
        <span className={`w-2 h-2 rounded-full ${onStrike ? 'bg-blue-500' : 'bg-gray-300'} mr-2`}></span>
        <span className="font-medium">{name}</span>
      </div>
      <div className="grid grid-cols-5 gap-4 text-sm">
        <span>{stats.runs}</span>
        <span>{stats.balls}</span>
        <span>{stats.fours}</span>
        <span>{stats.sixes}</span>
        <span>{stats.strikeRate.toFixed(1)}</span>
      </div>
    </div>
  );
};