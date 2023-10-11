'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PokemonItem } from '@/types';
import { Trash2 } from 'lucide-react';

type TPokemonCard = {
  caughtCount: number;
  nickname?: string;
  onReleaseButtonClicked?: () => void;
  pokemon: PokemonItem;
};

const PokemonCard = ({ caughtCount, nickname, onReleaseButtonClicked, pokemon }: TPokemonCard) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card className="w-full">
        <CardHeader className="p-2 -space-y-2">
          <p className="text-sm">#{pokemon.id}</p>
          <CardTitle className="text-lg">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-0">
          <div className="relative flex justify-center">
            <Image alt="Pokemon Image" className="object-cover" height={200} src={pokemon.image} width={200} />
          </div>
          {nickname && (
            <p className="bg-gray-100 rounded-lg text-center text-sm font-medium p-1 overflow-clip text-ellipsis">
              {nickname}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end p-2">
          {nickname ? (
            <Button onClick={onReleaseButtonClicked} variant="destructive">
              <Trash2 />
            </Button>
          ) : (
            <Badge variant="gradient">{`${caughtCount} owned`}</Badge>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PokemonCard;
