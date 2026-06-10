import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { formatCount } from '../utils/numbers';
import * as Linking from "expo-linking"

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#586069',
    fontSize: 15,
    marginBottom: 8,
  },
  languageBadge: {
    color: 'white',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden', // Necesario en iOS para ver el borderRadius en Text
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#586069',
  },
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});


// Componente pequeño para las estadísticas
const StatItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatCount(value)}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  
  const handleOpenGitHub = () => {
    if (item?.url) {
      Linking.openURL(item.url); // <--- Abre el navegador nativo del celular
    }
  };

  return(
  <View testID="repositoryItem">
  <View style={styles.container}>
    {/* Parte Superior: Avatar e Información */}
    <View style={styles.topSection}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.languageBadge}>{item.language}</Text>
      </View>
    </View>

    {/* Parte Inferior: Estadísticas */}
    <View style={styles.statsSection}>
      <StatItem label="Stars" value={item.stargazersCount} />
      <StatItem label="Forks" value={item.forksCount} />
      <StatItem label="Reviews" value={item.reviewCount} />
      <StatItem label="Rating" value={item.ratingAverage} />
    </View>
  </View>
  {/* Si la prop es verdadera, renderizamos el botón de GitHub */}
      {showGitHubButton && (
        <Pressable style={styles.githubButton} onPress={handleOpenGitHub}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
  </View>
)};

export default RepositoryItem;