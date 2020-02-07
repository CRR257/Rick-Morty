import gql from "graphql-tag";

const GET_CHARACTERS = gql`
  query($character: String!, $page: Int!) {
    characters(page: $page, filter: { name: $character }) {
      results {
        id
        name
        image
        status
        origin {
          name
        }
      }
      info {
        count
        pages
        prev
        next
      }
    }
  }
`;

export default GET_CHARACTERS;