import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage(); //obtenemos el contexto
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // Ejecutamos la mutación pasando las variables en el formato que pide el server
    const { data } = await mutate({
        variables: {
            credentials: { username, password }
        }
    });
    // almacenar el token obtenido
    if (data && data.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);

      //restablecer apollo limpia cache y relanza queries
      await apolloClient.resetStore();
    }
    
    return { data }
  };

  return [signIn, result];
};

export default useSignIn