import { gql } from "@apollo/client";

export const SIGN_IN = gql `
    mutation Authenticate ($credentials: AuthenticateInput) {
        authenticate (credentials: $credentials) {
            accessToken
            user {
                username
            }
        }
    }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repositoryId # <-- Clave para redirigir después de crearla
      rating
      text
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const DELETE_REVIEW = gql `
    mutation DeleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`