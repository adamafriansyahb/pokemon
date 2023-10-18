'use client';

import { useContext, useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toTitleCase } from '@/lib/utils';
import { PokemonDetail } from '@/types';
import { PokemonContext } from '@/context/pokemonContext';

type TCatchPokemonModal = {
  open: boolean;
  pokemon: PokemonDetail;
  setOpen: (isOpen: boolean) => void;
};

const CatchPokemonModal = ({ open, pokemon, setOpen }: TCatchPokemonModal) => {
  const { toast } = useToast();
  const { catchPokemon, isNicknameAvailable } = useContext(PokemonContext);

  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputtedNickname = e.target.value.trim();
    setNickname(inputtedNickname);

    if (isNicknameAvailable(pokemon.id, inputtedNickname)) {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  };

  const handleSavePokemon = () => {
    catchPokemon(nickname, pokemon);
    setOpen(false);
    toast({
      variant: 'default',
      title: `Good job!, ${toTitleCase(nickname)} the ${toTitleCase(pokemon.name)} has joined your team`,
      // eslint-disable-next-line quotes
      description: `Go catch another pokemon to accompany ${toTitleCase(nickname)}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You caught {toTitleCase(pokemon.name)}! &#129395;</DialogTitle>
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
            {!isNicknameValid && <p className="text-xs text-red-600">Nickname is already used.</p>}
          </section>

          <DialogFooter>
            <Button
              className="bg-gradient-to-br from-emerald-400 to-blue-400 dark:text-white"
              disabled={!nickname || !isNicknameValid}
              onClick={handleSavePokemon}
              type="button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CatchPokemonModal;
