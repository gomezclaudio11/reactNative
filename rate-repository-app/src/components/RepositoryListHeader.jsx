import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  picker: {
    backgroundColor: 'white',
    padding: 5,
  },
});

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder, searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      {/* Caja de texto para la búsqueda en tiempo real */}
      <TextInput
        style={styles.input}
        placeholder="Search repositories..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)} // Modifica el estado inmediatamente
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;