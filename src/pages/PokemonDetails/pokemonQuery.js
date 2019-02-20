import gql from "graphql-tag";

export default gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      id
      image
      number
      name
      attacks {
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
        }
      }
    }
  }
`;
