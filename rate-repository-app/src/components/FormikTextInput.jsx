import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import TextModificado from './TextModificado';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a', // Rojo para el mensaje
    fontSize: 12,
    paddingLeft: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}//spread operator
      />
      {showError && <TextModificado style={styles.errorText}>{meta.error}</TextModificado>}
    </>
  );
};

export default FormikTextInput;

/**
  Sin este componente, tendrías que crear un useState para cada campo, manejar el error a 
  mano y escribir muchísimas líneas de código.

El Hook useField(name)
Cuando hacés useField('username'), Formik busca en su "cerebro" el estado de ese campo
específico y te devuelve tres herramientas:

    field: Contiene el valor actual (ej: "Ale123").

    meta: Contiene la información extra (ej: "¿El usuario ya tocó el campo?", 
    "¿Hay un mensaje de error de Yup?").

    helpers: Son las funciones para cambiar el valor (ej: "guardá este texto que escribió el usuario").

meta.error: Es el mensaje que viene de Yup (ej: "Username is required").
meta.touched: Es un booleano que se vuelve true cuando el usuario hace clic en el campo y 
luego sale (pierde el foco).  

text input
onChangeText: Cuando el usuario escribe una letra, usamos helpers.setValue(value) para 
mandársela a Formik.

onBlur: Cuando el usuario deja de escribir y toca otra parte de la pantalla, usamos 
helpers.setTouched(true). Esto le avisa a Formik que el campo ya fue "visitado" y ahora 
sí puede mostrar errores si los hay.

value={field.value}: Esto hace que el input sea controlado. El texto que ves en pantalla 
viene directamente desde el estado de Formik.

necesitamos este componente intermedio para no tener que repetir toda esa lógica manual 
cada vez que quieras crear un campo de texto nuevo en tu app.
 */