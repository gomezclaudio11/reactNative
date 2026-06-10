import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import TextModificado from './TextModificado';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white' },
  button: { backgroundColor: '#0366d6', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

// Esquema de validación estricto con Yup
const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const initialValues = { ownerName: '', repositoryName: '', rating: '', text: '' };

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      // Mandamos la mutación convirtiendo el rating a número entero
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parseInt(rating, 10),
            text,
          },
        },
      });

      // Si se crea con éxito, redirigimos usando el repositoryId retornado
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log('Error creando la reseña:', e.message);
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
            <FormikTextInput name="ownerName" placeholder="Repository owner username" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" keyboardType="numeric" />
            <FormikTextInput 
              name="text" 
              placeholder="Review" 
              multiline // <-- Permite que se expanda a varias líneas
              numberOfLines={4} 
            />
            <Pressable onPress={handleSubmit} style={styles.button}>
              <TextModificado style={styles.buttonText}>Create a review</TextModificado>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;