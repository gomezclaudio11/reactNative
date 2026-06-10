import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) { # <-- Directiva mágica de GraphQL
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId # <-- Para saber a qué repo pertenece
            repository {
              fullName # <-- Para mostrar el título del proyecto
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepository(
        $orderBy: AllRepositoriesOrderBy, 
        $orderDirection: OrderDirection,
        $searchKeyword: String
        ) {
    repositories(
        orderBy: $orderBy, 
        orderDirection: $orderDirection,
        searchKeyword: $searchKeyword
        ) {
     edges {
          node {
            id
            fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) { # <-- Agregamos $first y $after
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) { # <-- Le pasamos los argumentos a las reviews
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor # <-- Solicitamos el cursor de cada reseña
        }
        pageInfo { # <-- Solicitamos la información de página para saber si hay más
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

/**
 A diferencia de una API REST común (donde tú haces fetch ('url/repositorios') y el servidor 
 te tira todo lo que tiene,  quieras o no), GraphQL tiene una filosofía estricta: el servidor 
 no  te va a dar absolutamente nada que tú no le pidas textualmente.
 
 estructura se llama Relay Connections (Conexiones Relay) y es el estándar de oro en la 
 industria para manejar paginación (cuando hay miles de datos y los quieres traer de a 10 o 
 20 para no colgar la app)

 Por eso en el componente SingleRepository.jsx tuviste que meter esta línea matemática:

const reviews = repository.reviews
  ? repository.reviews.edges.map((edge) => edge.node)
  : [];

desarmar esa estructura compleja del servidor para transformarla en un arreglo plano de nodes
(objetos puros) que tu FlatList pueda entender y dibujar fácilmente en el celular.
 */