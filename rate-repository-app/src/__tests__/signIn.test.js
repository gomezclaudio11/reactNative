import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn'; // Ajusta la ruta a tu componente

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // 1. Creamos una función simulada (Mock Function)
      const onSubmit = jest.fn();

      // 2. Renderizamos el contenedor pasándole nuestra función simulada
      render(<SignInContainer onSubmit={onSubmit} />);

      // 3. Llenamos los campos de texto simulando la escritura del usuario
      // Usamos act() para envolver los eventos asíncronos de Formik y evitar advertencias
      await act(async () => {
        fireEvent.changeText(screen.getByTestId('usernameInput'), 'kalle');
      });
      
      await act(async () => {
        fireEvent.changeText(screen.getByTestId('passwordInput'), 'password');
      });

      // 4. Simulamos el click en el botón de envío
      await act(async () => {
        fireEvent.press(screen.getByTestId('submitButton'));
      });

      // 5. Esperamos a que Formik procese el envío asíncronamente
      await waitFor(() => {
        // Verificamos que la función onSubmit haya sido llamada exactamente 1 vez
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Verificamos que el primer argumento de esa llamada sea el objeto con los datos correctos
        // mock.calls[0][0] significa: Primera llamada [0], Primer argumento [0]
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});