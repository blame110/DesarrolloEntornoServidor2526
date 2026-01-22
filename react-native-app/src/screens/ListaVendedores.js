// ════════════════════════════════════════════════════════════════════════════
// PANTALLA: LISTA DE VENDEDORES
// ════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

// useFocusEffect: Se ejecuta cada vez que la pantalla obtiene el foco
// Útil para recargar datos cuando volvemos de otra pantalla
import { useFocusEffect } from '@react-navigation/native';

import { getVendedores } from '../services/api';
import VendedorCard from '../components/VendedorCard';

/**
 * Props de navegación:
 * React Navigation inyecta automáticamente estas props a cada pantalla:
 * 
 * @param {object} navigation - Objeto para navegar entre pantallas
 *   - navigation.navigate('NombreRuta', { params }) → Ir a otra pantalla
 *   - navigation.goBack() → Volver a la pantalla anterior
 *   - navigation.push('NombreRuta') → Apilar otra instancia de la pantalla
 * 
 * @param {object} route - Información de la ruta actual
 *   - route.params → Parámetros pasados a esta pantalla
 *   - route.name → Nombre de la ruta actual
 */
const ListaVendedores = ({ navigation }) => {
    // ────────────────────────────────────────────────────────────────────────
    // ESTADOS
    // ────────────────────────────────────────────────────────────────────────
    const [vendedores, setVendedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    // ────────────────────────────────────────────────────────────────────────
    // useFocusEffect: RECARGAR AL VOLVER A ESTA PANTALLA
    // ────────────────────────────────────────────────────────────────────────
    /**
     * useFocusEffect es similar a useEffect, pero se ejecuta:
     * - Cuando la pantalla obtiene el foco (se muestra)
     * - NO cuando pierde el foco
     * 
     * useCallback: Memoriza la función para evitar re-creaciones innecesarias
     * El array [] indica que la función no tiene dependencias
     * 
     * CASO DE USO:
     * Usuario está en Lista → va a Crear → crea vendedor → vuelve a Lista
     * Queremos que la lista se recargue para mostrar el nuevo vendedor
     */
    useFocusEffect(
        useCallback(() => {
            console.log('Pantalla ListaVendedores enfocada, recargando...');
            cargarVendedores(1, false);
        }, [])
    );

    // ────────────────────────────────────────────────────────────────────────
    // FUNCIÓN: CARGAR VENDEDORES
    // ────────────────────────────────────────────────────────────────────────
    const cargarVendedores = async (pageNum = 1, refresh = false) => {
        try {
            if (refresh) {
                setRefreshing(true);
            } else if (pageNum === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            setError(null);
            const response = await getVendedores(pageNum, 10);

            if (response.status === 'success') {
                const nuevosVendedores = response.data.data;

                if (pageNum === 1) {
                    setVendedores(nuevosVendedores);
                } else {
                    setVendedores(prev => [...prev, ...nuevosVendedores]);
                }

                setTotalPages(response.data.last_page);
                setPage(pageNum);
            }

        } catch (err) {
            setError('No se pudieron cargar los vendedores');
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
            setLoadingMore(false);
        }
    };

    // Pull to refresh
    const onRefresh = () => {
        cargarVendedores(1, true);
    };

    // Scroll infinito
    const cargarMas = () => {
        if (!loadingMore && page < totalPages) {
            cargarVendedores(page + 1);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // NAVEGACIÓN: IR AL DETALLE
    // ────────────────────────────────────────────────────────────────────────
    /**
     * navigation.navigate(nombreRuta, parametros)
     * 
     * - nombreRuta: El 'name' definido en Stack.Screen
     * - parametros: Objeto con datos que recibirá la pantalla destino
     * 
     * En la pantalla destino se accede con: route.params.id
     */
    const handlePressVendedor = (vendedor) => {
        navigation.navigate('DetalleVendedor', { id: vendedor.id });
    };

    // ────────────────────────────────────────────────────────────────────────
    // NAVEGACIÓN: IR A CREAR
    // ────────────────────────────────────────────────────────────────────────
    const irACrear = () => {
        navigation.navigate('CrearVendedor');
    };

    // Renderizar cada item
    const renderItem = ({ item }) => (
        <VendedorCard
            vendedor={item}
            onPress={() => handlePressVendedor(item)}
        />
    );

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO CONDICIONAL
    // ────────────────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text style={styles.loadingText}>Cargando vendedores...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>❌ {error}</Text>
                <TouchableOpacity onPress={() => cargarVendedores()}>
                    <Text style={styles.retryText}>Pulsa para reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO PRINCIPAL
    // ────────────────────────────────────────────────────────────────────────
    return (
        <View style={styles.container}>
            {/* Cabecera */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Vendedores</Text>
                    <Text style={styles.subtitle}>
                        {vendedores.length} vendedor(es)
                    </Text>
                </View>

                {/* Botón crear */}
                <TouchableOpacity
                    style={styles.botonCrear}
                    onPress={irACrear}
                    activeOpacity={0.7}
                >
                    <Text style={styles.botonCrearTexto}>+ Nuevo</Text>
                </TouchableOpacity>
            </View>

            {/* Lista o mensaje vacío */}
            {vendedores.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.emptyText}>No hay vendedores</Text>
                    <TouchableOpacity onPress={irACrear}>
                        <Text style={styles.retryText}>Crear el primero</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={vendedores}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#0d6efd']}
                        />
                    }
                    onEndReached={cargarMas}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loadingMore ? (
                            <View style={styles.footer}>
                                <ActivityIndicator size="small" color="#0d6efd" />
                            </View>
                        ) : null
                    }
                />
            )}
        </View>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// ESTILOS
// ════════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#0d6efd',
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    botonCrear: {
        backgroundColor: '#28a745',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    botonCrearTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    list: {
        paddingVertical: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
    errorText: {
        color: '#dc3545',
        fontSize: 16,
        textAlign: 'center',
    },
    retryText: {
        marginTop: 15,
        color: '#0d6efd',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
    },
    footer: {
        padding: 15,
        alignItems: 'center',
    },
});

export default ListaVendedores;