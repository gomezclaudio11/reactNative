import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  //useQuery de Apollo se encarga de todo: el estado de carga, los errores y el refetch automático
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables, // <-- Aquí le inyectamos { orderBy, orderDirection } dinámicamente
    fetchPolicy: 'cache-and-network', // Mantiene los datos actualizados al volver a la pantalla
  });

  return {
    // Si data existe, devolvemos data.repositories para que tu FlatList no se rompa
    repositories: data ? data.repositories : undefined,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;