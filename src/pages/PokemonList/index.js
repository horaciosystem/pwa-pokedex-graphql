import React from "react";
import { useQuery } from "react-apollo-hooks";
import { styled, Grid } from "reakit";
import { Link } from "react-router-dom";
import MainColumn from "common/MainColumn";
import pokemonsQuery from "./pokemonsQuery";
import PokemonCard from "./PokemonCard";

const GridContainer = styled(Grid)`
  justify-content: center;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
`;

function PokemonList(props) {
  let { error, data, loading } = useQuery(pokemonsQuery, {
    variables: { first: 100 },
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    return <div>This resource is not accessible</div>;
  }

  if (loading && !data.pokemons) {
    return <span>Loading...</span>;
  }

  return (
    <MainColumn>
      <GridContainer>
        {data.pokemons.map(pokemon => (
          <Link key={pokemon.id} to={`/pokemons/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </GridContainer>
    </MainColumn>
  );
}

export default PokemonList;
