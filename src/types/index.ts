export type PokemonItem = {
  id: number;
  image: string;
  name: string;
  url?: string;
};

export type PokemonList = {
  count: number;
  next: string;
  previous: string;
  nextOffset: number;
  prevOffset: number;
  results: PokemonItem[];
  status: Boolean;
  message: string;
};

export type TGetAllPokemonsResponse = {
  data: {
    pokemons: PokemonList;
  };
};

export type TCaughtPokemon = {
  nickname: string;
  pokemon: PokemonDetail;
};

export type TPokemonChip<T extends string> = {
  [Key in T]: {
    name: string;
  };
};

export type Ability = TPokemonChip<'ability'>;
export type Move = TPokemonChip<'move'>;
export type Type = TPokemonChip<'type'>;

type Sprites = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

export type Stat = {
  base_stat: number;
  effort: number;
} & TPokemonChip<'stat'>;

export type PokemonDetail = {
  abilities: Ability[];
  base_experience: number;
  height: number;
  id: number;
  message: string;
  moves: Move[];
  name: string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

export enum ReleaseTypes {
  all = 'all',
  single = 'single',
}

export type TReleaseAction = ReleaseTypes.all | ReleaseTypes.single;

export type TPokemonType =
  | 'normal'
  | 'ghost'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';
