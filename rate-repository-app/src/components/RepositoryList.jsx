import React from 'react';
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react';
import useRepositories from '../hook/useRepositories';
import RepositoryListHeader from "./RepositoryListHeader"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

// 1. EL CONTENEDOR COMO COMPONENTE DE CLASE (Evita el bug del desmonte del teclado)
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchQuery, setSearchQuery } = this.props;

    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        style={{ backgroundColor: '#e1e4e8' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader} // <-- Referencia limpia a la propiedad de clase
      />
    );
  }
}

// 2. EL COMPONENTE FUNCIONAL (Maneja Hooks de Apollo, Estados y Debounce)
const RepositoryList = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  
  // Estado para lo que el usuario tipea en el momento
  const [searchQuery, setSearchQuery] = useState('');
  
  // AplicamosuseDebounce: creamos una variable retrasada 500ms
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  // Armamos las variables dinámicas para el hook useRepositories
  const getVariables = () => {
    let orderParams = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };

    if (selectedOrder === 'HIGHEST_RATED') {
      orderParams = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    } else if (selectedOrder === 'LOWEST_RATED') {
      orderParams = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    }

    return {
      ...orderParams,
      searchKeyword: debouncedSearchQuery, // <-- Le pasamos el texto con retraso a Apollo
    };
  };

  const { repositories } = useRepositories(getVariables());

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      navigate={navigate}
    />
  );
};

export default RepositoryList;

/**
 flatList
 A diferencia de un ScrollView (que carga todos los elementos a la vez), la FlatList es 
 "Lazy" (perezosa). Solo renderiza los elementos que el usuario está viendo actualmente en 
 pantalla. Si tienes 1000 repositorios, la FlatList no crea 1000 componentes de golpe; crea 
 solo los 10 que caben en el celular, ahorrando muchísima memoria.
 */