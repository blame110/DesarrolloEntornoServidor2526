import React from 'react';
import { StatusBar } from 'react-native';
import ListaVendedores from './src/screens/ListaVendedores';


/**
 * Componente principal de la aplicación
 */
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d6efd" />
      <ListaVendedores />
    </>
  );
}
