'use client';

import { useContext, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import PokemonChipSection from './components/PokemonChipSection';
import PokemonStatsChip from './components/PokemonStatsChip';
import { PokemonContext } from '@/context/pokemonContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type TPokemonDetailContainer = {
  pokemon: any;
};

const PokemonDetailsContainer = ({ pokemon }: TPokemonDetailContainer) => {
  const chipSections = [
    { title: 'Types', data: pokemon.types, name: 'type' },
    { title: 'Abilities', data: pokemon.abilities, name: 'ability' },
    { title: 'Moves', data: pokemon.moves, name: 'move' },
  ];

  const { toast } = useToast();
  const { canCatchPokemon, catchPokemon, isNicknameAvailable } = useContext(PokemonContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const handleOpenDialog = () => {
    if (canCatchPokemon()) {
      setIsDialogOpen(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Oops! The pokemon ran away 😫',
        // eslint-disable-next-line quotes
        description: "Don't give up, catch them again!",
      });
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setNickname(nickname);

    if (isNicknameAvailable(pokemon.id, nickname)) {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  };

  const handleSavePokemon = () => {
    catchPokemon(nickname, pokemon);
    setIsDialogOpen(false);
    toast({
      variant: 'default',
      title: `Good job!, ${nickname} the ${pokemon.name} has joined your team`,
      // eslint-disable-next-line quotes
      description: "Don't give up, catch them again!",
    });
  };

  return (
    <section className="relative">
      <section className="flex justify-center">
        <Image
          alt="pokemon-img"
          src={pokemon.sprites.front_default}
          width={300}
          height={300}
          className="object-cover"
        />
      </section>

      <section className="flex flex-col space-y-4 mt-5">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="text-3xl lg:text-4xl font-bold"
        >
          {`#${pokemon.id} ${pokemon.name}`}
        </motion.h1>

        <section>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 100, y: 0 }}
            className="text-xl font-semibold mb-2"
          >
            Stats:
          </motion.h2>
          <div className="grid grid-cols-2 gap-2">
            <PokemonStatsChip index={0} name="height (m)" value={pokemon.height / 10} />
            <PokemonStatsChip index={1} name="weight (kg)" value={pokemon.weight / 10} />
            {pokemon.stats.map((statistic: any, idx: number) => (
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

      <Button onClick={handleOpenDialog} className="fixed right-5 bottom-5" variant="destructive">
        Catch
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <form>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You caught {pokemon.name}! &#129395;</DialogTitle>
              <DialogDescription>Lets give your pokemon a lovely nickname.</DialogDescription>
            </DialogHeader>

            <section className="flex flex-col space-y-1.5">
              <div className="flex justify-center">
                <Image
                  alt="pokemon-img"
                  src={pokemon.sprites.front_default}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <Input onChange={handleNicknameChange} placeholder="Insert a nickname here..." />
              {!isNicknameValid && (
                <p className='text-xs text-red-600'>Nickname is already used.</p>
              )}
            </section>

            <DialogFooter>
              <Button disabled={!nickname || !isNicknameValid} onClick={handleSavePokemon} type="button">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </section>
  );
};

export default PokemonDetailsContainer;
