import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList'; // Ajusta la ruta a tu componente

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // 1. Renderizar el componente contenedor con los datos mockeados
      render(<RepositoryListContainer repositories={repositories} />);

      // Tip de debug: Si descomentas la siguiente línea, verás qué está dibujando exactamente la prueba
      // screen.debug();

      // 2. Obtener todos los elementos del repositorio mediante el testID
      const repositoryItems = screen.getAllByTestId('repositoryItem');

      // Verificamos que se hayan renderizado dos elementos en la lista
      expect(repositoryItems).toHaveLength(2);

      // --- PRUEBAS PARA EL PRIMER REPOSITORIO (Formik) ---
      // En lugar de evaluar el contenedor completo, buscamos que los textos existan en la pantalla
      expect(screen.getByText('jaredpalmer/formik')).toBeDefined();
      expect(screen.getByText('Build forms in React, without the tears')).toBeDefined();
      expect(screen.getByText('TypeScript')).toBeDefined();
      
      // Validamos las estadísticas usando el formato exacto que devolvió tu componente (visto en el "Received")
      expect(screen.getByText('21.9k')).toBeDefined(); // Stars
      expect(screen.getByText('1.6k')).toBeDefined(); // Forks
      expect(screen.getByText('88')).toBeDefined();   // Rating

      // --- PRUEBAS PARA EL SEGUNDO REPOSITORIO (React Async) ---
      expect(screen.getByText('async-library/react-async')).toBeDefined();
      expect(screen.getByText('Flexible promise-based React data loader')).toBeDefined();
      expect(screen.getByText('JavaScript')).toBeDefined();
      expect(screen.getByText('1.8k')).toBeDefined(); // Stars
      expect(screen.getByText('69')).toBeDefined();   // Forks
      expect(screen.getByText('72')).toBeDefined();   // Rating

      // --- VALIDACIÓN DE REVIEWS REPETIDOS ---
      // Como ambos repositorios tienen 3 reviews, usamos getAllByText
      const reviewElements = screen.getAllByText('3');
      expect(reviewElements).toHaveLength(2); // Validamos que existan los dos "3" en la pantalla
    });
  });
});