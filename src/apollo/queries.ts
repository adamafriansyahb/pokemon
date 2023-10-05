import { gql } from '@apollo/client';

export const GET_ALL_POKEMON = gql`
  query getAllPokemon($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        id
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          name
        }
      }
      base_experience
      height
      id
      message
      moves {
        move {
          name
        }
      }
      name
      sprites {
        front_default
        back_default
      }
      stats {
        effort
        base_stat
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
      weight
    }
  }
`;
