import { PokemonDetail, TCaughtPokemon } from '@/types';
import { createContext } from 'react';

type TPokemonContext = {
  allCaughtPokemonsCount: number;
  canCatchPokemon: () => boolean;
  catchPokemon: (nickname: string, pokemon: PokemonDetail) => void;
  caughtPokemons: { [id: number]: TCaughtPokemon[] };
  countCaughtPokemonById: (id: number) => number;
  isNicknameAvailable: (id: number, nickname: string) => boolean;
  releaseAllPokemons: () => void;
  releaseSinglePokemon: (id: number, nickname: string) => void;
};

export const PokemonContext = createContext<TPokemonContext>({
  allCaughtPokemonsCount: 0,
  canCatchPokemon: () => true,
  catchPokemon: () => {},
  caughtPokemons: {},
  countCaughtPokemonById: () => 0,
  isNicknameAvailable: () => true,
  releaseAllPokemons: () => {},
  releaseSinglePokemon: () => {},
});
