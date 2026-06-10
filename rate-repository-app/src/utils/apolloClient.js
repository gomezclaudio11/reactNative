import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import Constants from "expo-constants";

const apolloUri = Constants.expoConfig.extra.apolloUri;

// 1. Creamos el enlace HTTP
const httpLink = createHttpLink({
  uri: apolloUri,
});

// 2. Configuramos el enlace de autenticación
const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
    try {
      // Leemos el token desde el almacenamiento
      const accessToken = await authStorage.getAccessToken();
      
      // Retornamos los headers al contexto
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log('Error en authLink:', e);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    // MODIFICAMOS LA CACHÉ CON LAS POLÍTICAS DE COMBINACIÓN DE DATOS
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // Paginación para la lista de repositorios principal
            repositories: relayStylePagination(),
          },
        },
        Repository: {
          fields: {
            // Paginación para las reseñas de un repositorio único
            reviews: {
              keyArgs: false, // Evita que separe la caché por argumentos como "first" o "after"
              merge(existing, incoming) {
                if (!existing) return incoming;
                return {
                  ...incoming,
                  edges: [...existing.edges, ...incoming.edges], // Concatena las reseñas viejas con las nuevas páginas
                };
              },
            },
          },
        },
      },
    }),
  });
};

export default createApolloClient;