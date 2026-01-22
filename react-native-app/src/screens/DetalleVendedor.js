// ════════════════════════════════════════════════════════════════════════════
// PANTALLA: DETALLE DE VENDEDOR
// ════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';

import { getVendedor, eliminarVendedor } from '../services/api';

/**
 * @param {object} navigation - Objeto de navegación
 * @param {object} route - Contiene los parámetros pasados a esta pantalla
 *   route.params.id → El ID del vendedor (pasado desde ListaVendedores)
 */
const DetalleVendedor = ({ navigation, route }) => {
    // ────────────────────────────────────────────────────────────────────────
    // OBTENER PARÁMETROS DE LA RUTA
    // ────────────────────────────────────────────────────────────────────────
    /**
     * route.params contiene los parámetros pasados al navegar:
     * navigation.navigate('DetalleVendedor', { id: 5 })
     * 
     * Aquí extraemos el 'id' del objeto params
     */
    const { id } = route.params;

    // ────────────────────────────────────────────────────────────────────────
    // ESTADOS
    // ────────────────────────────────────────────────────────────────────────
    const [vendedor, setVendedor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [eliminando, setEliminando] = useState(false);

    // ────────────────────────────────────────────────────────────────────────
    // CARGAR VENDEDOR AL MONTAR
    // ────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        cargarVendedor();
    }, [id]);  // Se ejecuta cuando cambia el ID

    const cargarVendedor = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getVendedor(id);

            if (response.status === 'success') {
                setVendedor(response.data);
            }

        } catch (err) {
            setError('No se pudo cargar el vendedor');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // NAVEGACIÓN: IR A EDITAR
    // ────────────────────────────────────────────────────────────────────────
    const irAEditar = () => {
        navigation.navigate('EditarVendedor', { id: vendedor.id });
    };

    // ────────────────────────────────────────────────────────────────────────
    // ELIMINAR VENDEDOR
    // ────────────────────────────────────────────────────────────────────────
    /**
     * Alert.alert muestra un diálogo nativo del sistema
     * 
     * Sintaxis:
     * Alert.alert(titulo, mensaje, [botones], opciones)
     * 
     * Cada botón es un objeto con:
     * - text: Texto del botón
     * - style: 'default', 'cancel', 'destructive' (iOS muestra rojo)
     * - onPress: Función a ejecutar
     */
    const confirmarEliminar = () => {
        Alert.alert(
            '⚠️ Confirmar eliminación',
            `¿Está seguro de eliminar a "${vendedor.nombre}"?\n\nEsta acción no se puede deshacer.`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',  // En iOS aparece diferente
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',  // En iOS aparece en rojo
                    onPress: handleEliminar,
                },
            ]
        );
    };

    const handleEliminar = async () => {
        try {
            setEliminando(true);

            await eliminarVendedor(id);

            // Mostrar mensaje de éxito
            Alert.alert(
                '✅ Éxito',
                'Vendedor eliminado correctamente',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Volver a la lista
                            navigation.goBack();
                        },
                    },
                ]
            );

        } catch (err) {
            Alert.alert('Error', 'No se pudo eliminar el vendedor');
            console.error(err);
        } finally {
            setEliminando(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // FUNCIONES AUXILIARES
    // ────────────────────────────────────────────────────────────────────────
    const formatearFecha = (fecha) => {
        if (!fecha) return 'N/A';
        return new Date(fecha).toLocaleDateString('es-ES');
    };

    const formatearSueldo = (sueldo) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(sueldo);
    };

    const getSexoTexto = (sexo) => {
        switch (sexo) {
            case 'M': return 'Masculino';
            case 'F': return 'Femenino';
            default: return 'Otro';
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO CONDICIONAL
    // ────────────────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    if (error || !vendedor) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>❌ {error || 'Vendedor no encontrado'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Volver al listado</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO PRINCIPAL
    // ────────────────────────────────────────────────────────────────────────
    return (
        <ScrollView style={styles.container}>
            {/* Tarjeta de información */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.nombre}>{vendedor.nombre}</Text>
                    <Text style={styles.id}>#{vendedor.id}</Text>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.fila}>
                        <Text style={styles.label}>NIF:</Text>
                        <Text style={styles.valor}>{vendedor.nif}</Text>
                    </View>

                    <View style={styles.fila}>
                        <Text style={styles.label}>Fecha Nacimiento:</Text>
                        <Text style={styles.valor}>
                            {formatearFecha(vendedor.fecha_nac)}
                        </Text>
                    </View>

                    <View style={styles.fila}>
                        <Text style={styles.label}>Sexo:</Text>
                        <Text style={styles.valor}>{getSexoTexto(vendedor.sexo)}</Text>
                    </View>

                    <View style={styles.fila}>
                        <Text style={styles.label}>Sueldo Base:</Text>
                        <Text style={[styles.valor, styles.sueldo]}>
                            {formatearSueldo(vendedor.sueldo_base)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Botones de acción */}
            <View style={styles.acciones}>
                {/* Botón Editar */}
                <TouchableOpacity
                    style={[styles.boton, styles.botonEditar]}
                    onPress={irAEditar}
                    activeOpacity={0.7}
                >
                    <Text style={styles.botonTexto}>✏️ Editar</Text>
                </TouchableOpacity>

                {/* Botón Eliminar */}
                <TouchableOpacity
                    style={[
                        styles.boton,
                        styles.botonEliminar,
                        eliminando && styles.botonDisabled
                    ]}
                    onPress={confirmarEliminar}
                    disabled={eliminando}
                    activeOpacity={0.7}
                >
                    {eliminando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.botonTexto}>🗑️ Eliminar</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Botón Volver */}
            <TouchableOpacity
                style={styles.botonVolver}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
                <Text style={styles.botonVolverTexto}>← Volver al listado</Text>
            </TouchableOpacity>
        </ScrollView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    errorText: {
        color: '#dc3545',
        fontSize: 16,
        textAlign: 'center',
    },
    linkText: {
        marginTop: 15,
        color: '#0d6efd',
        textDecorationLine: 'underline',
    },
    card: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        backgroundColor: '#0d6efd',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nombre: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    id: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
    },
    cardBody: {
        padding: 20,
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        color: '#666',
        fontSize: 16,
    },
    valor: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    sueldo: {
        color: '#28a745',
        fontWeight: 'bold',
    },
    acciones: {
        flexDirection: 'row',
        padding: 15,
        gap: 10,
    },
    boton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    botonEditar: {
        backgroundColor: '#ffc107',
    },
    botonEliminar: {
        backgroundColor: '#dc3545',
    },
    botonDisabled: {
        backgroundColor: '#ccc',
    },
    botonTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botonVolver: {
        margin: 15,
        marginTop: 0,
        padding: 15,
        backgroundColor: '#6c757d',
        borderRadius: 8,
        alignItems: 'center',
    },
    botonVolverTexto: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DetalleVendedor;