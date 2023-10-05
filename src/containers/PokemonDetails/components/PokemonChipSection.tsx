'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

type TPokemonChipSection = {
  data: any;
  index: number;
  sectionName: string;
  title: string;
};

const PokemonChipSection = ({ data, index, sectionName, title }: TPokemonChipSection) => {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 + index / 10 }}>
      <motion.h2
        className="text-xl font-semibold"
        initial={{ y: 10 }}
        viewport={{ once: true }}
        whileInView={{ y: 0 }}
      >
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
            <Badge className="text-base">{item[`${sectionName}`].name}</Badge>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PokemonChipSection;
