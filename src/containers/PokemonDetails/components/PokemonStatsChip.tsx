'use client';

import { motion } from 'framer-motion';

type TPokemonStatChip = {
  index: number;
  name: string;
  value: number | string;
};

const PokemonStatsChip = ({ index, name, value }: TPokemonStatChip) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1 }}
    >
      <p className="font-medium">{`${name}:`}</p>
      <p className="font-semibold">{value}</p>
    </motion.div>
  );
};

export default PokemonStatsChip;
