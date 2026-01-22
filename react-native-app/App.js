// ════════════════════════════════════════════════════════════════════════════
// PUNTO DE ENTRADA DE LA APLICACIÓN
// ════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { StatusBar } from 'react-native';

// Importamos nuestro navegador que contiene todas las rutas
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      {/* Configuración de la barra de estado */}
      <StatusBar barStyle="light-content" backgroundColor="#0d6efd" />

      {/* AppNavigator contiene todas las pantallas y rutas */}
      <AppNavigator />
    </>
  );
}