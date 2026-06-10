import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextModificado from './TextModificado'; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
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
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  date: {
    color: '#586069',
    marginBottom: 10,
  },
  text: {
    color: '#24292e',
    lineHeight: 20,
  },
});

const ReviewItem = ({ review }) => {
  // Formateo básico de fecha: "2026-05-20T..." -> "20.05.2026"
  const formattedDate = new Date(review.createdAt).toLocaleDateString('es-AR');

  return (
    <View style={styles.container}>
      {/* Círculo Azul con el Puntaje */}
      <View style={styles.ratingContainer}>
        <TextModificado style={styles.ratingText}>{review.rating}</TextModificado>
      </View>

      {/* Información de la Reseña */}
      <View style={styles.infoContainer}>
        <TextModificado style={styles.username}>{review.user.username}</TextModificado>
        <TextModificado style={styles.date}>{formattedDate}</TextModificado>
        <TextModificado style={styles.text}>{review.text}</TextModificado>
      </View>
    </View>
  );
};

export default ReviewItem;