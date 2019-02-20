import React from "react";
import { Flex, Image, Paragraph, Card } from "reakit";

function PokemonCard({ pokemon: { name, image } }) {
  return (
    <Card width="100%">
      <Flex flexDirection="column" alignItems="center">
        <Card.Fit use={Image} src={image} alt={name} width={200} height={200} />
        <Paragraph>{name}</Paragraph>
      </Flex>
    </Card>
  );
}

export default PokemonCard;
