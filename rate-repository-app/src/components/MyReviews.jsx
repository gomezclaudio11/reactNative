import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { GET_CURRENT_USER } from '../graphql/queries';
import {  DELETE_REVIEW } from "../graphql/mutations";
import TextModificado from './TextModificado';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white'},
  reviewContainer: { 
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#0366d6',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: { color: '#0366d6', fontWeight: 'bold', fontSize: 18 },
  infoContainer: { flex: 1 },
  repoName: { fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  date: { color: '#586069', marginBottom: 10 },
  text: { color: '#24292e', lineHeight: 20 },
  separator: { height: 10, backgroundColor: '#e1e4e8' },
  // Estilos nuevos para los botones de acción
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#0366d6',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d73a49', // Rojo peligro
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

// Componente interno para renderizar cada reseña propia
const UserReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useMutation(DELETE_REVIEW)
  const formattedDate = new Date(review.createdAt).toLocaleDateString('es-AR');

  // Función para manejar la alerta nativa y posterior borrado
  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // Cierra el diálogo sin hacer nada
        },
        {
          text: 'Delete',
          style: 'destructive', // Estilo rojo en iOS
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: review.id } });
              refetch(); // <-- Volvemos a pedir los datos frescos para actualizar la lista
            } catch (e) {
              console.log('Error al eliminar la reseña:', e.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <TextModificado style={styles.ratingText}>{review.rating}</TextModificado>
      </View>
      <View style={styles.infoContainer}>
        {/* Mostramos el nombre del repositorio completo */}
        <TextModificado style={styles.repoName}>{review.repository.fullName}</TextModificado>
        <TextModificado style={styles.date}>{formattedDate}</TextModificado>
        <TextModificado style={styles.text}>{review.text}</TextModificado>
      </View>
    </View>

    <View style={styles.buttonsContainer}>
        <Pressable 
          style={[styles.button, styles.viewButton]} 
          onPress={() => navigate(`/repository/${review.repositoryId}`)}
        >
          <TextModificado style={styles.buttonText}>View repository</TextModificado>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDelete}
        >
          <TextModificado style={styles.buttonText}>Delete review</TextModificado>
        </Pressable>
      </View>
      </View>
    );
};

const MyReviews = () => {
  // Ejecutamos la consulta activando explícitamente el include de las reseñas
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (error || !data?.me) {
    return <TextModificado>Error al cargar tus reseñas</TextModificado>;
  }

  // Mapeamos los edges de las reviews del usuario logueado
  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  if (reviews.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <TextModificado>You haven't reviewed any repositories yet.</TextModificado>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <UserReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      style={{ backgroundColor: '#e1e4e8' }}
    />
  );
};

export default MyReviews;