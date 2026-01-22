// ════════════════════════════════════════════════════════════════════════════
// PANTALLA: EDITAR VENDEDOR
// ════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import FormularioVendedor from '../components/FormularioVendedor';
import { getVendedor, actualizarVendedor } from '../services/api';

const EditarVendedor = ({ navigation, route }) => {
    // ────────────────────────────────────────────────────────────────────────
    // OBTENER ID DEL VENDEDOR
    // ────────────────────────────────────────────────────────────────────────
    const { id } = route.params;

    // ────────────────────────────────────────────────────────────────────────
    // ESTADOS
    // ────────────────────────────────────────────────────────────────────────
    const [vendedor, setVendedor] = useState(null);
    const [loadingInicial, setLoadingInicial] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errores, setErrores] = useState({});
    const [errorCarga, setErrorCarga] = useState(null);

    // ────────────────────────────────────────────────────────────────────────
    // CARGAR DATOS DEL VENDEDOR AL MONTAR
    // ────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        cargarVendedor();
    }, [id]);

    const cargarVendedor = async () => {
        try {
            setLoadingInicial(true);
            setErrorCarga(null);

            const response = await getVendedor(id);

            if (response.status === 'success') {
                setVendedor(response.data);
            }

        } catch (err) {
            setErrorCarga('No se pudo cargar el vendedor');
            console.error(err);
        } finally {
            setLoadingInicial(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // MANEJAR ENVÍO DEL FORMULARIO
    // ────────────────────────────────────────────────────────────────────────
    const handleSubmit = async (datos) => {
        try {
            setLoading(true);
            setErrores({});

            await actualizarVendedor(id, datos);

            Alert.alert(
                '✅ Éxito',
                'Vendedor actualizado correctamente',
                [
                    {
                        text: 'Ver detalle',
                        onPress: () => {
                            // Volver al detalle (que se actualizará automáticamente)
                            navigation.goBack();
                        },
                    },
                ]
            );

        } catch (error) {
            if (error.errores) {
                setErrores(error.errores);
            } else {
                Alert.alert('Error', error.message || 'No se pudo actualizar');
            }
        } finally {
            setLoading(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO: CARGANDO DATOS INICIALES
    // ────────────────────────────────────────────────────────────────────────
    if (loadingInicial) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text style={styles.loadingText}>Cargando datos...</Text>
            </View>
        );
    }

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO: ERROR AL CARGAR
    // ────────────────────────────────────────────────────────────────────────
    if (errorCarga || !vendedor) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>
                    ❌ {errorCarga || 'Vendedor no encontrado'}
                </Text>
            </View>
        );
    }

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO: FORMULARIO
    // ────────────────────────────────────────────────────────────────────────
    return (
        <FormularioVendedor
            datosIniciales={vendedor}        // Datos actuales del vendedor
            onSubmit={handleSubmit}
            loading={loading}
            textoBoton="Actualizar Vendedor"
            errores={errores}
        />
    );
};

// ════════════════════════════════════════════════════════════════════════════
// ESTILOS
// ════════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
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
});

export default EditarVendedor;