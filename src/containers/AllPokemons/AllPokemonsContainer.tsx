'use client';

import { useContext } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PokemonList } from '@/types';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_POKEMON } from '@/apollo/queries';
import PokemonCard from '@/components/shared/PokemonCard';
import PageTitle from '@/components/shared/PageTitle';
import Loader from '@/components/shared/Loader';
import { Separator } from '@/components/ui/separator';
import { PokemonContext } from '@/context/pokemonContext';
import EndMessage from './components/EndMessage';

const FETCH_LIMIT = 24;

const AllPokemonsContainer = () => {
  const { countCaughtPokemonById } = useContext(PokemonContext);

  const { data, fetchMore } = useSuspenseQuery<{ pokemons: PokemonList }>(GET_ALL_POKEMON, {
    variables: {
      limit: FETCH_LIMIT,
      offset: 0,
    },
  });

  const handleLoadMorePokemons = () => {
    fetchMore({
      variables: {
        limit: 24,
        offset: FETCH_LIMIT * (data.pokemons.results.length / FETCH_LIMIT),
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        return {
          pokemons: {
            ...fetchMoreResult.pokemons,
            results: [...prevResult.pokemons.results, ...fetchMoreResult.pokemons.results],
          },
        };
      },
    });
  };

  return (
    <div className="flex flex-col space-y-5">
      <PageTitle
        title="Meet the Pokemons"
        subtitle="Get to know the pokemons that exist in this universe. Catch them if you can 😜"
      />

      <Separator />

      <InfiniteScroll
        dataLength={data.pokemons.results.length}
        endMessage={<EndMessage />}
        hasMore={!!data.pokemons.next}
        loader={<Loader />}
        next={handleLoadMorePokemons}
      >
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {data.pokemons.results.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.name}`} key={pokemon.id}>
              <PokemonCard caughtCount={countCaughtPokemonById(pokemon.id)} pokemon={pokemon} />
            </Link>
          ))}
        </section>
      </InfiniteScroll>
    </div>
  );
};

export default AllPokemonsContainer;
