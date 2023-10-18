import PokemonDetailsContainer from '@/containers/PokemonDetails';
import { getClient } from '@/apollo/lib/client';
import { GET_POKEMON } from '@/apollo/queries';

const PokemonDetailPage = async ({ params }: { params: { name: string } }) => {
  const { data } = await getClient().query({
    query: GET_POKEMON,
    variables: {
      name: params.name,
    },
  });

  return <PokemonDetailsContainer pokemon={data.pokemon} />;
};

export default PokemonDetailPage;
