import gql from "graphql-tag";

export default gql`
  query Pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
    }
  }
`;
