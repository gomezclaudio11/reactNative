import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from "@apollo/client"
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

//iniciamos el almacenamiento
const authStorage = new AuthStorage()
//creamos el cliente de apollo pasandole el storage
const apolloClient = createApolloClient(authStorage)

const testStorage = async () => {
  try {
    await authStorage.setAccessToken('test-token');
    const val = await authStorage.getAccessToken();
    console.log('PRUEBA STORAGE EXITOSA:', val);
  } catch (e) {
    console.log('PRUEBA STORAGE FALLIDA:', e);
  }
};

testStorage();

export default function App() {
  return  (
    <NativeRouter>
      <ApolloProvider client={apolloClient} >
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>  
  )
}
 
