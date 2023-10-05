import AllPokemonsContainer from '@/containers/AllPokemons';
import { getClient } from '@/apollo/lib/client';
import { GET_ALL_POKEMON } from '@/apollo/queries';

const Home = async () => {
  const { data } = await getClient().query({
    query: GET_ALL_POKEMON,
    variables: {
      limit: 24,
      offset: 0,
    },
  });

  const { results } = data.pokemons;

  return (
    <AllPokemonsContainer initialPokemons={results} />
  );
};

export default Home;
