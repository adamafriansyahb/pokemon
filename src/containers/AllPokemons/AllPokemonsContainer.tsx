'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { TGetAllPokemonsResponse, PokemonItem } from '@/types';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_POKEMON } from '@/apollo/queries';
import PokemonCard from '@/components/shared/PokemonCard';
import PageTitle from '@/components/shared/PageTitle';
import { PokemonContext } from '@/context/pokemonContext';

type AllPokemonsContainerType = {
  initialPokemons: PokemonItem[];
};

const FETCH_LIMIT = 24;

const AllPokemonsContainer = ({ initialPokemons }: AllPokemonsContainerType) => {
  const { countCaughtPokemonById } = useContext(PokemonContext);

  const [pokemons, setPokemons] = useState<PokemonItem[]>(initialPokemons);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPage, setScrollPage] = useState(1);

  const { fetchMore } = useSuspenseQuery(GET_ALL_POKEMON);

  const scrollListener = useCallback(async () => {
    // detect user has reached the bottom
    const { innerHeight, pageYOffset } = window;
    const { offsetHeight } = document.body;

    // console.log('inner + pageY', innerHeight + pageYOffset);
    // console.log('ofset', offsetHeight);

    if (Math.ceil(innerHeight + pageYOffset) >= offsetHeight && !isFinished) {
      setIsLoading(true);

      const { data } = (await fetchMore({
        variables: {
          limit: FETCH_LIMIT,
          offset: scrollPage * FETCH_LIMIT,
        },
      })) as TGetAllPokemonsResponse;

      if (data?.pokemons?.next) {
        setPokemons([...pokemons, ...data.pokemons.results]);
      } else {
        setIsFinished(true);
      }

      setScrollPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }
  }, [scrollPage, setScrollPage, pokemons, isFinished, fetchMore]);

  useEffect(() => {
    console.log('loading', isLoading);
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', scrollListener, { passive: true });

    // remove event listener prevent memory leaks
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener, scrollPage, setScrollPage, pokemons]);

  return (
    <div className="flex flex-col space-y-5">
      <PageTitle
        title="Meet the Pokemons &#128572;"
        subtitle="Get to know the pokemons that exist in this universe. Catch us if you can!"
      />

      <Separator />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {pokemons.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.name}`} key={pokemon.id}>
            <PokemonCard caughtCount={countCaughtPokemonById(pokemon.id)} pokemon={pokemon} />
          </Link>
        ))}
        {/* {isLoading && <p className="text-center font-bold text-2xl">Loading....</p>} */}
      </section>
    </div>
  );
};

export default AllPokemonsContainer;
