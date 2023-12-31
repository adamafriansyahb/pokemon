'use client';

import { toTitleCase } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Shield, Heart, ShieldPlus, Sword, Swords, Zap } from 'lucide-react';

type TPokemonStatChip = {
  index: number;
  name: string;
  value: number | string;
};

const getTitleIcon = (name: string) => {
  switch (name) {
    case 'hp':
      return <Heart size="18px" color="red" fill="red" />;
    case 'defense':
      return <Shield size="18px" fill="lightblue" />;
    case 'attack':
      return <Sword size="18px" />;
    case 'special-attack':
      return <Swords size="18px" />;
    case 'special-defense':
      return <ShieldPlus fill="lightgreen" size="18px" />;
    case 'speed':
      return <Zap size="18px" color="orange" fill="orange" />;
    default:
      return '';
  }
};

const formatName = (name: string) => {
  if (name === 'special-attack') return 'S. Attack';
  if (name === 'special-defense') return 'S. Defense';

  return toTitleCase(name);
};

const PokemonStatsChip = ({ index, name, value }: TPokemonStatChip) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center bg-gray-100 dark:bg-slate-800 p-2 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center space-x-1">
        {getTitleIcon(name)}
        <p className="font-medium">{formatName(name)}</p>
      </div>
      <p className="font-semibold">{value}</p>
    </motion.div>
  );
};

export default PokemonStatsChip;
