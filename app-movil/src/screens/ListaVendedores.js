import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Alert,
} from 'react-native';
import { getVendedores } from '../services/api';
import VendedorCard from '../componentes/vendedorCard';


/**
 * Pantalla que muestra el listado de vendedores
 */
const ListaVendedores = () => {
    // Estados
    const [vendedores, setVendedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);


    // Cargar vendedores al montar el componente
    useEffect(() => {
        cargarVendedores();
    }, []);


    // Función para cargar vendedores
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

                //Si es la primera vez que cargamos pageNum es 1, asignamos los vendedores cargados
                if (pageNum === 1) {
                    setVendedores(nuevosVendedores);
                } else {
                    //Si no es uno es que hemos llegado abajo y estamos cargando mas
                    //En ese caso cargamos los vendedores previos mas los nuevos
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


    // Función para refrescar (pull to refresh)
    const onRefresh = () => {
        cargarVendedores(1, true);
    };


    // Función para cargar más (scroll infinito)
    const cargarMas = () => {
        if (!loadingMore && page < totalPages) {
            cargarVendedores(page + 1);
        }
    };


    // Función cuando se pulsa una tarjeta
    const handlePressVendedor = (vendedor) => {
        Alert.alert(
            'Vendedor seleccionado',
            `Has seleccionado a: ${vendedor.nombre}`,
            [{ text: 'OK' }]
        );
        // Aquí navegaremos al detalle en el futuro
    };


    // Renderizar cada item de la lista
    const renderItem = ({ item }) => (
        <VendedorCard
            vendedor={item}
            onPress={() => handlePressVendedor(item)}
        />
    );


    // Componente para mostrar mientras carga
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text style={styles.loadingText}>Cargando vendedores...</Text>
            </View>
        );
    }


    // Componente para mostrar si hay error
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>❌ {error}</Text>
                <Text style={styles.retryText} onPress={() => cargarVendedores()}>
                    Pulsa aquí para reintentar
                </Text>
            </View>
        );
    }


    // Lista vacía
    if (vendedores.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyText}>No hay vendedores registrados</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            {/* Cabecera */}
            <View style={styles.header}>
                <Text style={styles.title}>Lista de Vendedores</Text>
                <Text style={styles.subtitle}>
                    {vendedores.length} vendedor(es) cargado(s)
                </Text>
            </View>


            {/* Lista */}
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
                            <Text style={styles.footerText}>Cargando más...</Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#0d6efd',
        padding: 20,
        paddingTop: 50,  // Para el notch
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    footerText: {
        marginLeft: 10,
        color: '#666',
    },
});


export default ListaVendedores;
