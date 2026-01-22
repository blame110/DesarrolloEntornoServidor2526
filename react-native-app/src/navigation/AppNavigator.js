// ════════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE NAVEGACIÓN (RUTAS)
// ════════════════════════════════════════════════════════════════════════════

/**
 * React Navigation funciona como un "enrutador" similar a las rutas de Laravel
 * 
 * CONCEPTOS CLAVE:
 * 
 * 1. NavigationContainer: Contenedor principal que maneja el estado de navegación
 *    - Es como el <BrowserRouter> en React Web
 *    - Solo debe haber UNO en toda la app
 * 
 * 2. Stack Navigator: Navegación tipo "pila" (como las cartas de una baraja)
 *    - Cada pantalla nueva se "apila" encima de la anterior
 *    - Al volver, se "desapila" y vuelve a la anterior
 *    - Ejemplo: Lista → Detalle → Editar (cada una se apila)
 * 
 * 3. Screen: Define cada pantalla/ruta de la aplicación
 *    - name: Nombre de la ruta (como Route::name() en Laravel)
 *    - component: Componente a renderizar
 *    - options: Configuración (título, estilos, etc.)
 */

import React from 'react';

// NavigationContainer: Contenedor principal de navegación
import { NavigationContainer } from '@react-navigation/native';

// createNativeStackNavigator: Crea un navegador tipo "pila"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ────────────────────────────────────────────────────────────────────────────
// IMPORTAR PANTALLAS
// Cada pantalla es un componente que se mostrará según la ruta
// ────────────────────────────────────────────────────────────────────────────
import ListaVendedores from '../screens/ListaVendedores';
import DetalleVendedor from '../screens/DetalleVendedor';
import CrearVendedor from '../screens/CrearVendedor';
import EditarVendedor from '../screens/EditarVendedor';

// ────────────────────────────────────────────────────────────────────────────
// CREAR EL STACK NAVIGATOR
// Stack es un objeto con dos componentes: Navigator y Screen
// ────────────────────────────────────────────────────────────────────────────
const Stack = createNativeStackNavigator();

/**
 * Componente principal de navegación
 * Define todas las rutas/pantallas de la aplicación
 */
const AppNavigator = () => {
    return (
        // ════════════════════════════════════════════════════════════════════
        // NavigationContainer: Envuelve toda la navegación
        // Mantiene el estado de navegación (qué pantalla está activa, historial)
        // ════════════════════════════════════════════════════════════════════
        <NavigationContainer>

            {/* ══════════════════════════════════════════════════════════════
                Stack.Navigator: Contenedor de las pantallas
                
                PROPS:
                - initialRouteName: Pantalla inicial (como Route::get('/'))
                - screenOptions: Opciones globales para todas las pantallas
            ══════════════════════════════════════════════════════════════ */}
            <Stack.Navigator
                initialRouteName="ListaVendedores"  // Pantalla inicial
                screenOptions={{
                    // ────────────────────────────────────────────────────────
                    // ESTILOS GLOBALES DEL HEADER
                    // Se aplican a TODAS las pantallas
                    // ────────────────────────────────────────────────────────
                    headerStyle: {
                        backgroundColor: '#0d6efd',  // Fondo azul
                    },
                    headerTintColor: '#fff',  // Color del texto y botones
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    // Animación al navegar
                    animation: 'slide_from_right',
                }}
            >
                {/* ══════════════════════════════════════════════════════════
                    DEFINICIÓN DE PANTALLAS (RUTAS)
                    
                    Equivalente en Laravel:
                    Route::get('/vendedores', [VendedorController::class, 'index'])
                        ->name('ListaVendedores');
                ══════════════════════════════════════════════════════════ */}

                {/* ──────────────────────────────────────────────────────────
                    RUTA: Lista de Vendedores (Pantalla principal)
                    Equivalente: GET /vendedores → index
                ────────────────────────────────────────────────────────── */}
                <Stack.Screen
                    name="ListaVendedores"      // Nombre de la ruta (para navegación)
                    component={ListaVendedores}  // Componente a renderizar
                    options={{
                        title: 'Vendedores',    // Título en el header
                        // Ocultamos el header porque la pantalla tiene el suyo
                        headerShown: false,
                    }}
                />

                {/* ──────────────────────────────────────────────────────────
                    RUTA: Detalle de Vendedor
                    Equivalente: GET /vendedores/{id} → show
                    
                    PARÁMETROS:
                    Los parámetros se pasan al navegar:
                    navigation.navigate('DetalleVendedor', { id: 5 })
                ────────────────────────────────────────────────────────── */}
                <Stack.Screen
                    name="DetalleVendedor"
                    component={DetalleVendedor}
                    options={{
                        title: 'Detalle',
                    }}
                />

                {/* ──────────────────────────────────────────────────────────
                    RUTA: Crear Vendedor
                    Equivalente: GET /vendedores/crear → create
                ────────────────────────────────────────────────────────── */}
                <Stack.Screen
                    name="CrearVendedor"
                    component={CrearVendedor}
                    options={{
                        title: 'Nuevo Vendedor',
                    }}
                />

                {/* ──────────────────────────────────────────────────────────
                    RUTA: Editar Vendedor
                    Equivalente: GET /vendedores/{id}/editar → edit
                ────────────────────────────────────────────────────────── */}
                <Stack.Screen
                    name="EditarVendedor"
                    component={EditarVendedor}
                    options={{
                        title: 'Editar Vendedor',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;