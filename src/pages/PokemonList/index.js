import React from "react";
import { useQuery } from "react-apollo-hooks";
import { styled, Grid } from "reakit";
import { Link } from "@reach/router";
import MainColumn from "common/MainColumn";
import pokemonsQuery from "./pokemonsQuery";
import PokemonCard from "./PokemonCard";

const GridContainer = styled(Grid)`
  column-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
`;

function PokemonList(props) {
  let { data, error, loading } = useQuery(pokemonsQuery, {
    variables: { first: 100 }
  });

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
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
