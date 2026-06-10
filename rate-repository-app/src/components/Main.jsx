import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';
import Constants from 'expo-constants';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews"

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1, 
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar/>
        <Routes>
            <Route path='/' element={<RepositoryList />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="/create-review" element={<CreateReview />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            {/* NUEVA RUTA DINÁMICA CON :ID */}
        <Route path="/repository/:id" element={<SingleRepository />} />
            <Route path='*' element={<Navigate to="/" replace />} /> 
        </Routes>
    </View>
    
  );
};

export default Main;