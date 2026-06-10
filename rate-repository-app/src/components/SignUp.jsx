import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import TextModificado from './TextModificado';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hook/useSignIn'; // Reutilizamos tu hook de login

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white' },
  button: { backgroundColor: '#0366d6', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

// Esquema de validación con las reglas del enunciado
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 character')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match') // <-- Truco del ref
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn(); // Hook de inicio de sesión automático
  const navigate = useNavigate();

  const initialValues = { username: '', password: '', passwordConfirm: '' };

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      // 1. Crear el usuario en la base de datos
      await mutate({
        variables: {
          user: { username, password },
        },
      });

      // 2. Login automático inmediato
      await signIn({ username, password });

      // 3. Redirigir a la lista de repositorios
      navigate('/');
    } catch (e) {
      console.log('Error en el registro:', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
            
            <Pressable onPress={handleSubmit} style={styles.button}>
              <TextModificado style={styles.buttonText}>Sign up</TextModificado>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;