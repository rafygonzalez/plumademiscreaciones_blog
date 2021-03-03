import { gql } from '@apollo/client';

export const ARTICLES_METADATA = gql`
  query articles(
    $limit: Int!
  ) {
    articles(limit: $limit) {
      id
      name
      description
    }
  }
`;
