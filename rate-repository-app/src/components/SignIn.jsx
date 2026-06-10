import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-native"
import FormikTextInput from './FormikTextInput';
import TextModificado from './TextModificado';
import useSignIn from '../hook/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#d73a4a', // Rojo para errores
  }
});

const initialValues = {
  username: '',
  password: '',
};

// Definimos las reglas: ambos campos son obligatorios
const validationSchema = yup.object().shape({ //le decimos a yup voy a validar un objeto y la explico la forma
  username: yup //las llaves deben llamarse igual 
    .string()
    .required('Username is required'),//el campo no puede estar vacio Formik lo va a guardar meta.error
  password: yup
    .string()
    .required('Password is required'),
});

//contenedor puro el que se testea
 export const SignInContainer = ({ onSubmit }) => {
  const initialValues = { username: "", password: "" }

   return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput 
              name="username" 
              placeholder="Username" 
              testID="usernameInput" // <-- IMPORTANTE PARA EL TEST
            />
            <FormikTextInput 
              name="password" 
              placeholder="Password" 
              secureTextEntry
              testID="passwordInput" // <-- IMPORTANTE PARA EL TEST
            />
            <Pressable 
              onPress={handleSubmit} 
              style={styles.button}
              testID="submitButton" // <-- IMPORTANTE PARA EL TEST
            >
              <TextModificado style={styles.buttonText}>Sign in</TextModificado>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
   
  );
};

//componente conectado el que usa la app real
const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try{
      await signIn({ username, password });
      navigate("/"); //reedireccionamos tras un login exitoso
    } catch (e) {
      console.log("Error al iniciar sesion", e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};
export default SignIn;