// ════════════════════════════════════════════════════════════════════════════
// PANTALLA: CREAR VENDEDOR
// ════════════════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Alert } from 'react-native';

import FormularioVendedor from '../components/FormularioVendedor';
import { crearVendedor } from '../services/api';

const CrearVendedor = ({ navigation }) => {
    // ────────────────────────────────────────────────────────────────────────
    // ESTADOS
    // ────────────────────────────────────────────────────────────────────────
    const [loading, setLoading] = useState(false);
    const [errores, setErrores] = useState({});

    // ────────────────────────────────────────────────────────────────────────
    // MANEJAR ENVÍO DEL FORMULARIO
    // ────────────────────────────────────────────────────────────────────────
    /**
     * Esta función se pasa al FormularioVendedor como prop 'onSubmit'
     * Se ejecuta cuando el usuario pulsa el botón de guardar
     * 
     * @param {object} datos - Datos del formulario validados localmente
     */
    const handleSubmit = async (datos) => {
        try {
            setLoading(true);
            setErrores({});  // Limpiar errores anteriores

            // Llamar a la API para crear
            const response = await crearVendedor(datos);

            // Si llegamos aquí, se creó correctamente
            Alert.alert(
                '✅ Éxito',
                'Vendedor creado correctamente',
                [
                    {
                        text: 'Ver detalle',
                        onPress: () => {
                            // Navegar al detalle del nuevo vendedor
                            // Usamos replace para que el usuario no pueda volver
                            // al formulario con el botón atrás
                            navigation.replace('DetalleVendedor', {
                                id: response.data.id
                            });
                        },
                    },
                    {
                        text: 'Volver a lista',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );

        } catch (error) {
            // Si hay errores de validación del servidor, los mostramos
            if (error.errores) {
                setErrores(error.errores);
            } else {
                Alert.alert('Error', error.message || 'No se pudo crear el vendedor');
            }
        } finally {
            setLoading(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO
    // Reutilizamos el FormularioVendedor
    // ────────────────────────────────────────────────────────────────────────
    return (
        <FormularioVendedor
            datosIniciales={{}}          // Vacío porque es creación
            onSubmit={handleSubmit}      // Función a ejecutar al enviar
            loading={loading}            // ¿Está procesando?
            textoBoton="Crear Vendedor"  // Texto del botón
            errores={errores}            // Errores del servidor
        />
    );
};

export default CrearVendedor;