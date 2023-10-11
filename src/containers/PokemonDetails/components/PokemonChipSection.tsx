'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { TPokemonType } from '@/types';
import { pokemonBgColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

type TPokemonChipSection = {
  data: any;
  index: number;
  sectionName: string;
  title: string;
};

const getColor = (type: TPokemonType) => {
  return `${pokemonBgColors[type]}`;
};

const PokemonChipSection = ({ data, index, sectionName, title }: TPokemonChipSection) => {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 + index / 10 }}>
      <motion.h2 className="text-xl font-semibold" initial={{ y: 10 }} viewport={{ once: true }} whileInView={{ y: 0 }}>
        {`${title}:`}
      </motion.h2>
      <div className="flex flex-wrap gap-1.5 my-2">
        {data.map((item: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className={cn('text-base dark:bg-slate-800 dark:text-white', sectionName === 'type' && getColor(item.type.name))}>
              {item[`${sectionName}`].name}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PokemonChipSection;
