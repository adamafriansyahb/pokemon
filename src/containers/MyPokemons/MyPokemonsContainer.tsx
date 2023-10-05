'use client';

import { useCallback, useContext, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PokemonCard from '@/components/shared/PokemonCard';
import { PokemonContext } from '@/context/pokemonContext';
import { ReleaseType, TCaughtPokemon } from '@/types';
import { Trash2 } from 'lucide-react';
import PageTitle from '@/components/shared/PageTitle';
import ReleasePokemonModal from './components/ReleasePokemonModal';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

const MyPokemonsContainer = () => {
  const { toast } = useToast();
  const { allCaughtPokemonsCount, caughtPokemons, countCaughtPokemonById, releaseAllPokemons, releaseSinglePokemon } =
    useContext(PokemonContext);

  const pageSubtitle = allCaughtPokemonsCount
    ? 'Here is the list of pokemons you have successfully tamed.'
    : 'You have no Pokemons.';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [releaseType, setReleaseType] = useState<ReleaseType>('single');

  // TODO: Bersihin state ini setelah released
  // TODO: useEffect untuk bersihin state ini setelah modal closed (?)
  const [selectedPokemon, setSelectedPokemon] = useState<TCaughtPokemon>();

  const handleModalTriggerClicked = (type: ReleaseType, pokemon?: TCaughtPokemon) => {
    setIsDialogOpen(true);
    setReleaseType(type);

    if (type === 'single') {
      setSelectedPokemon(pokemon);
    }
  };

  const handleReleasePokemon = useCallback(() => {
    if (releaseType === 'all') {
      releaseAllPokemons();
    } else if (releaseType === 'single' && selectedPokemon) {
      releaseSinglePokemon(selectedPokemon.pokemon.id, selectedPokemon.nickname);
    }

    toast({
      variant: 'default',
      title: `${
        releaseType === 'all' ? 'All Pokemons' : `${selectedPokemon?.nickname} the ${selectedPokemon?.pokemon.name}`
      } released!`,
      // eslint-disable-next-line quotes
      description: "Just don't regret your decision...",
    });

    setIsDialogOpen(false);
  }, [releaseAllPokemons, releaseSinglePokemon, releaseType, selectedPokemon, toast]);

  return (
    <div className="w-full lg:max-w-5xl flex flex-col space-y-5">
      <PageTitle title="My Pokemons" subtitle={pageSubtitle} />

      <Separator />

      {allCaughtPokemonsCount ? (
        <>
          <section className="flex justify-between items-center space-x-4">
            <Input className="md:max-w-sm" type="text" placeholder="Search pokemons..." />
            <Button onClick={() => handleModalTriggerClicked('all')} variant="destructive">
              <Trash2 />
            </Button>
          </section>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {caughtPokemons &&
              Object.keys(caughtPokemons).map((id) =>
                caughtPokemons[parseInt(id)].map((pokemon: TCaughtPokemon) => (
                  <PokemonCard
                    caughtCount={countCaughtPokemonById(pokemon.pokemon.id)}
                    key={id}
                    nickname={pokemon.nickname}
                    onReleaseButtonClicked={() => handleModalTriggerClicked('single', pokemon)}
                    pokemon={{
                      id: pokemon.pokemon.id,
                      name: pokemon.pokemon.name,
                      image: pokemon.pokemon.sprites.front_default,
                    }}
                  />
                ))
              )}
          </section>
        </>
      ) : (
        <section className="w-full px-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-4 items-center">
          <h3 className="mb-5 font-medium text-xl tracking-wide text-center">Lets discover the Pokemons and catch them!</h3>

          <div className="relative">
            <p className="absolute -top-2 left-20 text-5xl rotate-12">&#129312;</p>
            <p className="text-9xl">&#128014;</p>
          </div>

          <Link href="/">
            <Button className="tracking-wide">Discover Pokemons</Button>
          </Link>
        </section>
      )}

      <ReleasePokemonModal
        open={isDialogOpen}
        selectedPokemon={selectedPokemon}
        releaseType={releaseType}
        setOpen={setIsDialogOpen}
        onReleasePokemon={handleReleasePokemon}
      />
    </div>
  );
};

export default MyPokemonsContainer;
