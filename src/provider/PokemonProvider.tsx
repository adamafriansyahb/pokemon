'use client';

import { useEffect, useMemo, useState } from 'react';
import { PokemonContext } from '@/context/pokemonContext';
import { PokemonDetail, TCaughtPokemon } from '@/types';

export const LOCAL_STORAGE_KEY = 'Pokepedia';

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [caughtPokemons, setCaughtPokemons] = useState<{
    [id: number]: TCaughtPokemon[];
  }>(Object);

  const catchPokemon = (nickname: string, pokemon: PokemonDetail) => {
    const newCaughtPokemons = caughtPokemons;

    const caughtPokemonObj = {
      nickname: nickname.toLowerCase(),
      pokemon
    };

    if (newCaughtPokemons[pokemon.id]) {
      newCaughtPokemons[pokemon.id].push(caughtPokemonObj);
    } else {
      newCaughtPokemons[pokemon.id] = [caughtPokemonObj];
    }

    setCaughtPokemons({ ...newCaughtPokemons });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCaughtPokemons));
  };

  const isNicknameAvailable = (id: number, nickname: string) => {
    if (id in caughtPokemons) {
      for (const pokemon of caughtPokemons[id]) {
        if (pokemon.nickname === nickname) return false;
      }
    }

    return true;
  };

  const canCatchPokemon = () => {
    return Math.random() < 0.9;
  };

  const countCaughtPokemonById = (id: number) => {
    return caughtPokemons[id]?.length || 0;
  };

  const allCaughtPokemonsCount = useMemo(() => {
    let count = 0;

    Object.keys(caughtPokemons).forEach((id) => {
      count += caughtPokemons[parseInt(id)]?.length;
    });

    return count;
  }, [caughtPokemons]);

  const releaseAllPokemons = () => {
    setCaughtPokemons({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const releaseSinglePokemon = (id: number, nickname: string) => {
    const latestPokemons = caughtPokemons;
    const filteredPokemon = latestPokemons[id].filter((pokemon) => pokemon.nickname !== nickname);

    if (filteredPokemon.length) {
      latestPokemons[id] = filteredPokemon;
    } else {
      delete latestPokemons[id];
    }

    setCaughtPokemons({ ...latestPokemons });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(latestPokemons));
  };

  useEffect(() => {
    const prevCaughtPokemon = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (prevCaughtPokemon !== null) {
      setCaughtPokemons(JSON.parse(prevCaughtPokemon));
    }
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        allCaughtPokemonsCount,
        canCatchPokemon,
        catchPokemon,
        caughtPokemons,
        countCaughtPokemonById,
        isNicknameAvailable,
        releaseAllPokemons,
        releaseSinglePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
