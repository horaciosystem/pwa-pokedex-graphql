import React from "react";
import { useQuery } from "react-apollo-hooks";
import { styled, Flex, Image, Heading, List } from "reakit";
import pokemonQuery from "./pokemonQuery";

const TypesContainer = styled(Flex)`
  span + span {
    margin-left: 1rem;
  }
`;

function PokemonDetails({
  match: {
    params: { pokemonName }
  }
}) {
  let { error, data, loading } = useQuery(pokemonQuery, {
    variables: { name: pokemonName }
  });

  if (error) {
    return <div>This resource is not accessible</div>;
  }

  if (loading && !data.pokemon) {
    return <span>Loading...</span>;
  }

  let {
    pokemon: { name, image, types, attacks }
  } = data;

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading>{name}</Heading>
      <Image src={image} width={300} height={300} />
      <TypesContainer>
        {types.map(type => (
          <span key={type}>{type}</span>
        ))}
      </TypesContainer>
      <Heading as="h3">Attacks</Heading>
      <List>
        {attacks.special.map(it => (
          <li key={it.name}>{it.name}</li>
        ))}
      </List>
    </Flex>
  );
}

export default PokemonDetails;
