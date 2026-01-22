// ════════════════════════════════════════════════════════════════════════════
// FORMULARIO REUTILIZABLE PARA CREAR Y EDITAR VENDEDOR
// ════════════════════════════════════════════════════════════════════════════

/**
 * Este componente se reutiliza en CrearVendedor y EditarVendedor
 * Solo cambia:
 * - Los valores iniciales (vacíos vs datos existentes)
 * - El texto del botón (Crear vs Actualizar)
 * - La función onSubmit
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,          // Campo de texto (como <input> en HTML)
    TouchableOpacity,
    StyleSheet,
    ScrollView,         // Permite scroll si el contenido es muy largo
    ActivityIndicator,
    Platform,           // Para detectar iOS/Android
} from 'react-native';

// Picker para seleccionar sexo (desplegable)
// Necesita instalarse: npx expo install @react-native-picker/picker
import { Picker } from '@react-native-picker/picker';

/**
 * Props del componente:
 * @param {object} datosIniciales - Valores iniciales del formulario
 * @param {function} onSubmit - Función a ejecutar al enviar
 * @param {boolean} loading - ¿Está procesando?
 * @param {string} textoBoton - Texto del botón (Crear/Actualizar)
 * @param {object} errores - Errores de validación del servidor
 */
const FormularioVendedor = ({
    datosIniciales = {},
    onSubmit,
    loading = false,
    textoBoton = 'Guardar',
    errores = {},
}) => {
    // ────────────────────────────────────────────────────────────────────────
    // ESTADO DEL FORMULARIO
    // Cada campo tiene su propio estado
    // ────────────────────────────────────────────────────────────────────────

    const [nombre, setNombre] = useState(datosIniciales.nombre || '');
    const [nif, setNif] = useState(datosIniciales.nif || '');
    const [fechaNac, setFechaNac] = useState(datosIniciales.fecha_nac || '');
    const [sexo, setSexo] = useState(datosIniciales.sexo || '');
    const [sueldoBase, setSueldoBase] = useState(
        datosIniciales.sueldo_base?.toString() || ''
    );

    // ────────────────────────────────────────────────────────────────────────
    // ERRORES LOCALES (validación básica en cliente)
    // ────────────────────────────────────────────────────────────────────────
    const [erroresLocales, setErroresLocales] = useState({});

    // ────────────────────────────────────────────────────────────────────────
    // VALIDACIÓN LOCAL
    // Validación básica antes de enviar al servidor
    // ────────────────────────────────────────────────────────────────────────
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validar nombre
        if (!nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio';
        }

        // Validar NIF (formato básico: 8 números + 1 letra)
        const nifRegex = /^[0-9]{8}[A-Za-z]$/;
        if (!nif.trim()) {
            nuevosErrores.nif = 'El NIF es obligatorio';
        } else if (!nifRegex.test(nif)) {
            nuevosErrores.nif = 'Formato: 8 números + 1 letra (ej: 12345678A)';
        }

        // Validar fecha (formato YYYY-MM-DD)
        if (!fechaNac.trim()) {
            nuevosErrores.fecha_nac = 'La fecha es obligatoria';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaNac)) {
            nuevosErrores.fecha_nac = 'Formato: AAAA-MM-DD (ej: 1990-05-15)';
        }

        // Validar sexo
        if (!sexo) {
            nuevosErrores.sexo = 'Seleccione una opción';
        }

        // Validar sueldo
        if (!sueldoBase.trim()) {
            nuevosErrores.sueldo_base = 'El sueldo es obligatorio';
        } else if (isNaN(parseFloat(sueldoBase)) || parseFloat(sueldoBase) < 0) {
            nuevosErrores.sueldo_base = 'Debe ser un número positivo';
        }

        setErroresLocales(nuevosErrores);

        // Retorna true si no hay errores
        return Object.keys(nuevosErrores).length === 0;
    };

    // ────────────────────────────────────────────────────────────────────────
    // MANEJAR ENVÍO
    // ────────────────────────────────────────────────────────────────────────
    const handleSubmit = () => {
        // Primero validamos localmente
        if (!validarFormulario()) {
            return;  // Si hay errores, no enviamos
        }

        // Preparamos los datos para enviar
        const datos = {
            nombre: nombre.trim(),
            nif: nif.trim().toUpperCase(),
            fecha_nac: fechaNac.trim(),
            sexo: sexo,
            sueldo_base: parseFloat(sueldoBase),
        };

        // Llamamos a la función onSubmit pasada como prop
        onSubmit(datos);
    };

    // ────────────────────────────────────────────────────────────────────────
    // COMBINAR ERRORES (locales + servidor)
    // Los errores del servidor tienen prioridad
    // ────────────────────────────────────────────────────────────────────────
    const getError = (campo) => {
        // Primero buscamos en errores del servidor
        if (errores[campo]) {
            // errores[campo] puede ser un array, tomamos el primer mensaje
            return Array.isArray(errores[campo]) ? errores[campo][0] : errores[campo];
        }
        // Si no hay error del servidor, buscamos local
        return erroresLocales[campo] || null;
    };

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO
    // ────────────────────────────────────────────────────────────────────────
    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>

                {/* ══════════════ CAMPO NOMBRE ══════════════ */}
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre *</Text>
                    <TextInput
                        style={[
                            styles.input,
                            getError('nombre') && styles.inputError
                        ]}
                        value={nombre}
                        onChangeText={setNombre}  // Equivale a onChange en web
                        placeholder="Nombre completo"
                        placeholderTextColor="#999"
                        autoCapitalize="words"    // Primera letra mayúscula
                        editable={!loading}       // Desactivar si está cargando
                    />
                    {getError('nombre') && (
                        <Text style={styles.errorText}>{getError('nombre')}</Text>
                    )}
                </View>

                {/* ══════════════ CAMPO NIF ══════════════ */}
                <View style={styles.campo}>
                    <Text style={styles.label}>NIF *</Text>
                    <TextInput
                        style={[
                            styles.input,
                            getError('nif') && styles.inputError
                        ]}
                        value={nif}
                        onChangeText={setNif}
                        placeholder="12345678A"
                        placeholderTextColor="#999"
                        autoCapitalize="characters"  // Todo mayúsculas
                        maxLength={9}
                        editable={!loading}
                    />
                    {getError('nif') && (
                        <Text style={styles.errorText}>{getError('nif')}</Text>
                    )}
                </View>

                {/* ══════════════ CAMPO FECHA NACIMIENTO ══════════════ */}
                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha de Nacimiento *</Text>
                    <TextInput
                        style={[
                            styles.input,
                            getError('fecha_nac') && styles.inputError
                        ]}
                        value={fechaNac}
                        onChangeText={setFechaNac}
                        placeholder="AAAA-MM-DD (ej: 1990-05-15)"
                        placeholderTextColor="#999"
                        keyboardType="numbers-and-punctuation"
                        editable={!loading}
                    />
                    {getError('fecha_nac') && (
                        <Text style={styles.errorText}>{getError('fecha_nac')}</Text>
                    )}
                </View>

                {/* ══════════════ CAMPO SEXO (Picker) ══════════════ */}
                <View style={styles.campo}>
                    <Text style={styles.label}>Sexo *</Text>
                    <View style={[
                        styles.pickerContainer,
                        getError('sexo') && styles.inputError
                    ]}>
                        <Picker
                            selectedValue={sexo}
                            onValueChange={setSexo}
                            enabled={!loading}
                            style={styles.picker}
                        >
                            <Picker.Item label="-- Seleccionar --" value="" />
                            <Picker.Item label="Masculino" value="M" />
                            <Picker.Item label="Femenino" value="F" />
                            <Picker.Item label="Otro" value="O" />
                        </Picker>
                    </View>
                    {getError('sexo') && (
                        <Text style={styles.errorText}>{getError('sexo')}</Text>
                    )}
                </View>

                {/* ══════════════ CAMPO SUELDO ══════════════ */}
                <View style={styles.campo}>
                    <Text style={styles.label}>Sueldo Base (€) *</Text>
                    <TextInput
                        style={[
                            styles.input,
                            getError('sueldo_base') && styles.inputError
                        ]}
                        value={sueldoBase}
                        onChangeText={setSueldoBase}
                        placeholder="0.00"
                        placeholderTextColor="#999"
                        keyboardType="decimal-pad"  // Teclado numérico con decimales
                        editable={!loading}
                    />
                    {getError('sueldo_base') && (
                        <Text style={styles.errorText}>{getError('sueldo_base')}</Text>
                    )}
                </View>

                {/* ══════════════ BOTÓN ENVIAR ══════════════ */}
                <TouchableOpacity
                    style={[
                        styles.boton,
                        loading && styles.botonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={loading}
                    activeOpacity={0.7}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.botonTexto}>{textoBoton}</Text>
                    )}
                </TouchableOpacity>

            </View>
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
    form: {
        padding: 20,
    },
    campo: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    inputError: {
        borderColor: '#dc3545',
        borderWidth: 2,
    },
    errorText: {
        color: '#dc3545',
        fontSize: 14,
        marginTop: 5,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    boton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    botonDisabled: {
        backgroundColor: '#ccc',
    },
    botonTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FormularioVendedor;