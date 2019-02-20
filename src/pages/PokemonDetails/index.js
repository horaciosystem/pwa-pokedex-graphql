import React from "react";
import { useQuery } from "react-apollo-hooks";
import pokemonQuery from "./pokemonQuery";

function PokemonDetails({ pokemonName }) {
  let { data, error, loading } = useQuery(pokemonQuery, {
    variables: { name: pokemonName }
  });

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  let {
    pokemon: { name }
  } = data;
  return <span>{name}</span>;
}

export default PokemonDetails;
