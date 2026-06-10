import React from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { useQuery, useApolloClient } from "@apollo/client";
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import useAuthStorage from "../hook/useAuthStorage"
import { GET_CURRENT_USER } from '../graphql/queries';

// Definimos una constante de color para mantener la consistencia (Single Source of Truth)
const theme = {
  appBar: {
    backgroundColor: '#24292e', // Gris oscuro estilo GitHub
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    // Usamos padding para que el contenido no pegue contra los bordes
    paddingBottom: 15,
    paddingLeft: 15,
    flexDirection: 'row', // Por si luego agregas más botones al lado
  },
    text: {
    color: theme.text.color,
    fontSize: theme.text.fontSize,
    fontWeight: theme.text.fontWeight,
  },  
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  // Ejecutamos el query 'me' para saber si el usuario está logueado
  const { data } = useQuery(GET_CURRENT_USER);
  const user = data ? data.me : null;

  const handleSignOut = async () => {
    // 1. Eliminar token del almacenamiento
    await authStorage.removeAccessToken();
    // 2. Restablecer la tienda de Apollo (esto hace que 'me' vuelva a ejecutarse y de null)
    await apolloClient.resetStore();
    // 3. Redirigir al inicio
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <Pressable style={styles.tab}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>

        {/* SI EL USUARIO ESTÁ LOGUEADO, MUESTRA LA OPCIÓN DE CREAR RESEÑA */}
        {user && (
          <>
          <Pressable style={styles.tab}>
            <Link to="/create-review">
              <Text style={styles.text}>Create a review</Text>
            </Link>          
          </Pressable>
          <Pressable style={styles.tab}>
            <Link to="/my-reviews">
              <Text style={styles.text}>My reviews</Text>
            </Link>
          </Pressable>
        </>
        )}
        
        {/* Visibles solo si NO inició sesión */}
        {!user && (
          <Link to="/signup">
            <Text style={styles.text}>Sign up</Text>
          </Link>
        )}

        {user ? (
          // Si el usuario existe, mostramos el botón de cerrar sesión
          <Pressable style={styles.tab} onPress={handleSignOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          // Si es null, mostramos el enlace para iniciar sesión
          <Pressable style={styles.tab}>
            <Link to="/signin">
              <Text style={styles.text}>Sign in</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;