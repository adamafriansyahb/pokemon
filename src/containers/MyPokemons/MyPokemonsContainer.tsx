'use client';

import { useCallback, useContext, useDeferredValue, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PokemonCard from '@/components/shared/PokemonCard';
import { PokemonContext } from '@/context/pokemonContext';
import { TReleaseAction, ReleaseTypes, TCaughtPokemon } from '@/types';
import PageTitle from '@/components/shared/PageTitle';
import { useToast } from '@/components/ui/use-toast';
import { toTitleCase } from '@/lib/utils';

const ReleasePokemonModal = dynamic(() => import('./components/ReleasePokemonModal'));

const MyPokemonsContainer = () => {
  const { toast } = useToast();
  const { allCaughtPokemonsCount, caughtPokemons, countCaughtPokemonById, releaseAllPokemons, releaseSinglePokemon } =
    useContext(PokemonContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [releaseType, setReleaseType] = useState<TReleaseAction>(ReleaseTypes.single);
  const [selectedPokemon, setSelectedPokemon] = useState<TCaughtPokemon>();
  const [searchKey, setSearchKey] = useState('');

  const deferredSearchKey = useDeferredValue(searchKey);

  const handleModalTriggerClicked = (type: TReleaseAction, pokemon?: TCaughtPokemon) => {
    setIsDialogOpen(true);
    setReleaseType(type);

    if (type === ReleaseTypes.single) {
      setSelectedPokemon(pokemon);
    }
  };

  const handleReleasePokemon = useCallback(() => {
    if (releaseType === ReleaseTypes.all) {
      releaseAllPokemons();
    } else if (releaseType === ReleaseTypes.single && selectedPokemon) {
      releaseSinglePokemon(selectedPokemon.pokemon.id, selectedPokemon.nickname);
      setSelectedPokemon(undefined);
    }

    toast({
      variant: 'default',
      title: `${
        releaseType === ReleaseTypes.all
          ? 'All Pokemons'
          : `${toTitleCase(selectedPokemon?.nickname || '')} the ${toTitleCase(selectedPokemon?.pokemon.name || '')}`
      } released!`,
      // eslint-disable-next-line quotes
      description: "Just don't regret your decision...",
    });

    setIsDialogOpen(false);
  }, [releaseAllPokemons, releaseSinglePokemon, releaseType, selectedPokemon, toast]);

  const pageSubtitle = allCaughtPokemonsCount
    ? 'Here is the list of pokemons you have successfully tamed.'
    : 'You have no Pokemons.';

  const flattenedCaughtPokemons = useMemo(() => {
    const result: TCaughtPokemon[] = [];

    Object.keys(caughtPokemons).forEach((id) => {
      caughtPokemons[parseInt(id)].forEach((pokemon) => {
        result.push(pokemon);
      });
    });

    return result;
  }, [caughtPokemons]);

  const filteredPokemon = useMemo(() => {
    if (!deferredSearchKey) {
      return flattenedCaughtPokemons;
    }

    const result = flattenedCaughtPokemons.filter((pokemon) => {
      return pokemon.nickname.toLowerCase().indexOf(deferredSearchKey.toLowerCase()) > -1;
    });

    return result;
  }, [deferredSearchKey, flattenedCaughtPokemons]);

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedPokemon(undefined);
    }
  }, [isDialogOpen]);

  return (
    <div className="flex flex-col space-y-5">
      <PageTitle title="My Pokemons" subtitle={pageSubtitle} />

      <Separator />

      {allCaughtPokemonsCount ? (
        <>
          <section className="flex justify-between items-center space-x-4">
            <Input
              className="md:max-w-sm"
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search pokemons..."
              type="text"
            />
            <Button onClick={() => handleModalTriggerClicked(ReleaseTypes.all)} variant="destructive">
              <Trash2 />
            </Button>
          </section>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                caughtCount={countCaughtPokemonById(pokemon.pokemon.id)}
                key={pokemon.pokemon.id}
                nickname={pokemon.nickname}
                onReleaseButtonClicked={() => handleModalTriggerClicked(ReleaseTypes.single, pokemon)}
                pokemon={{
                  id: pokemon.pokemon.id,
                  name: pokemon.pokemon.name,
                  image: pokemon.pokemon.sprites.front_default,
                }}
              />
            ))}
          </section>
        </>
      ) : (
        <section className="w-full px-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-4 items-center">
          <h3 className="mb-5 font-medium text-xl tracking-wide text-center">
            Lets discover the Pokemons and catch them!
          </h3>

          <div className="relative">
            <p className="absolute -top-2 left-20 text-5xl rotate-12">&#129312;</p>
            <p className="text-9xl">&#128014;</p>
          </div>

          <Link href="/">
            <Button className="tracking-wider bg-gradient-to-br from-emerald-500 to-blue-500 font-semibold dark:text-white">
              Discover Pokemons
            </Button>
          </Link>
        </section>
      )}

      <ReleasePokemonModal
        onReleasePokemon={handleReleasePokemon}
        open={isDialogOpen}
        releaseType={releaseType}
        selectedPokemon={selectedPokemon}
        setOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default MyPokemonsContainer;
