'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PokemonItem } from '@/types';
import { toTitleCase } from '@/lib/utils';

type TPokemonCard = {
  caughtCount: number;
  nickname?: string;
  onReleaseButtonClicked?: () => void;
  pokemon: PokemonItem;
};

const PokemonCard = ({ caughtCount, nickname, onReleaseButtonClicked, pokemon }: TPokemonCard) => {
  return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Link className="absolute w-full h-full z-[1]" href={`/pokemon/${pokemon.name}`} />
        <Card className="w-full">
          <CardHeader className="p-2 -space-y-1">
            <p className="text-sm">#{pokemon.id}</p>
            <CardTitle className="text-lg">{toTitleCase(pokemon.name)}</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-0">
            <div className="relative flex justify-center">
              <Image alt="Pokemon Image" className="object-cover" height={200} src={pokemon.image} width={200} />
            </div>
            {nickname && (
              <p className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg text-white text-center text-sm font-medium p-1 overflow-clip text-ellipsis">
                {toTitleCase(nickname)}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end p-2">
            {nickname ? (
              <Button className="z-10" onClick={onReleaseButtonClicked} variant="destructive">
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
