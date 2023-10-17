'use client';

import { useContext, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import PokemonChipSection from './components/PokemonChipSection';
import PokemonStatsChip from './components/PokemonStatsChip';
import { PokemonContext } from '@/context/pokemonContext';
import { Badge } from '@/components/ui/badge';
import { PokemonDetail, TPokemonType } from '@/types';
import { pokemonBgColors, pokemonFromColors, pokemonToColors } from '@/lib/constants';
import { cn, toTitleCase } from '@/lib/utils';

type TPokemonDetailContainer = {
  pokemon: PokemonDetail;
};

const CatchPokemonModal = dynamic(() => import('./components/CatchPokemonModal'));

const PokemonDetailsContainer = ({ pokemon }: TPokemonDetailContainer) => {
  const dominantType = pokemon.types[0].type.name as TPokemonType;

  const chipSections = [
    { title: 'Types', data: pokemon.types, name: 'type' },
    { title: 'Abilities', data: pokemon.abilities, name: 'ability' },
    { title: 'Moves', data: pokemon.moves, name: 'move' },
  ];

  const { toast } = useToast();
  const { canCatchPokemon, countCaughtPokemonById } = useContext(PokemonContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    if (canCatchPokemon()) {
      setIsDialogOpen(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Oops! The pokemon ran away 🐈💨',
        // eslint-disable-next-line quotes
        description: "Don't give up, catch them again!",
      });
    }
  };

  const getGradient = () => {
    const secondaryType = pokemon.types.length > 1 ? (pokemon.types[1].type.name as TPokemonType) : dominantType;

    return `bg-gradient-to-br ${pokemonFromColors[dominantType]} ${pokemonToColors[secondaryType]}`;
  };

  return (
    <section className="relative">
      <section className={cn('flex justify-center pt-24 pb-5 -mx-4 sm:mx-0 -mt-24 rounded-b-[35px]', getGradient())}>
        <Image
          alt="pokemon-img"
          src={pokemon.sprites.front_default}
          width={300}
          height={300}
          className="object-cover"
        />
      </section>

      <section className="flex flex-col space-y-4 mt-5">
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-3xl lg:text-4xl font-bold tracking-wide"
          >
            {toTitleCase(pokemon.name)}
          </motion.h1>

          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            <Badge className="py-1" variant="gradient">
              {countCaughtPokemonById(pokemon.id)} owned
            </Badge>
          </motion.div>
        </div>

        <section>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 100, y: 0 }}
            className="text-xl font-semibold mb-2"
          >
            Stats:
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <PokemonStatsChip index={0} name="Height (m)" value={pokemon.height / 10} />
            <PokemonStatsChip index={1} name="Weight (kg)" value={pokemon.weight / 10} />
            {pokemon.stats.map((statistic, idx: number) => (
              <PokemonStatsChip
                index={idx + 2}
                key={statistic.stat.name}
                name={statistic.stat.name}
                value={statistic.base_stat}
              />
            ))}
          </div>
        </section>

        {chipSections.map((section, idx: number) => (
          <PokemonChipSection
            index={idx}
            key={section.name}
            title={section.title}
            data={section.data}
            sectionName={section.name}
          />
        ))}
      </section>

      <Button
        onClick={handleOpenDialog}
        className={cn('fixed right-5 bottom-5 font-bold text-white dark:text-white', pokemonBgColors[dominantType])}
      >
        Catch
      </Button>

      <CatchPokemonModal open={isDialogOpen} pokemon={pokemon} setOpen={setIsDialogOpen} />
    </section>
  );
};

export default PokemonDetailsContainer;
