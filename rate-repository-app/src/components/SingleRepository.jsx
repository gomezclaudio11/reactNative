import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from "./ReviewItem"
import { GET_REPOSITORY } from '../graphql/queries';
import TextModificado from './TextModificado'; 

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8', // Color gris de fondo para separar tarjetas
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams(); // Atrapamos el id de la URL (/repository/:id)
  
  // 1. Usamos useQuery directamente aquí para el repositorio único.
  // Empezamos pidiendo un 'first: 4' para que sea fácil probar el scroll.
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 4 },
    fetchPolicy: 'cache-and-network', // Buena práctica para mantener datos frescos
  });

  if (loading && !data) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (error || !data?.repository) {
    return <TextModificado>Error al cargar el repositorio</TextModificado>;
  }

  const repository = data.repository;

  // Mapeamos las reseñas de los edges igual que hicimos con los repositorios
  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

    // 2. Esta es la función mágica que se ejecutará al llegar al final de la lista
  const onEndReached = () => {
    const hasNextPage = data?.repository?.reviews?.pageInfo?.hasNextPage;
    
    // Si no hay más páginas que cargar, nos detenemos
    if (!hasNextPage) return;

    // fetchMore le avisa a Apollo que busque el siguiente bloque usando el endCursor
    fetchMore({
      variables: {
        id,
        after: data.repository.reviews.pageInfo.endCursor,
        first: 4,
      },
    });
  };

  return (
   <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      // La tarjeta de información va arriba de todo como cabecera
      ListHeaderComponent={() => (
        <View style={{ marginBottom: 10 }}>
          <RepositoryItem item={repository} showGitHubButton={true} />
        </View>
      )}
      // 3. Pasamos las propiedades de scroll infinito a la FlatList
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5} // Se activa cuando falta media pantalla para llegar al final
    />
  );
};

export default SingleRepository;