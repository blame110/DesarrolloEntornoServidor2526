// ════════════════════════════════════════════════════════════════════════════
// IMPORTACIONES
// ════════════════════════════════════════════════════════════════════════════

import React from 'react';

// Importamos los componentes de React Native que vamos a usar
// Cada uno tiene un propósito específico:
import {
    View,           // Contenedor (como un <div> en HTML)
    Text,           // Para mostrar texto (como un <span> o <p> en HTML)
    StyleSheet,     // Para crear estilos (como CSS)
    TouchableOpacity // Hace que un elemento sea "pulsable" con efecto visual
} from 'react-native';

// ════════════════════════════════════════════════════════════════════════════
// COMPONENTE VENDEDORCARD
// ════════════════════════════════════════════════════════════════════════════

/**
 * Componente funcional que recibe props (propiedades)
 * 
 * PROPS:
 * - vendedor: Objeto con los datos del vendedor
 * - onPress: Función que se ejecuta al pulsar la tarjeta
 * 
 * DESESTRUCTURACIÓN:
 * En lugar de: const VendedorCard = (props) => { props.vendedor... }
 * Usamos: const VendedorCard = ({ vendedor, onPress }) => { vendedor... }
 * Esto extrae las propiedades directamente
 */
const VendedorCard = ({ vendedor, onPress }) => {

    // ────────────────────────────────────────────────────────────────────────
    // FUNCIONES AUXILIARES
    // Estas funciones se definen dentro del componente
    // Se recrean cada vez que el componente se renderiza
    // ────────────────────────────────────────────────────────────────────────

    /**
     * Convierte una fecha ISO (2024-01-15) a formato español (15/01/2024)
     */
    const formatearFecha = (fecha) => {
        if (!fecha) return 'N/A';
        const date = new Date(fecha);  // Crea objeto Date de JavaScript
        return date.toLocaleDateString('es-ES');  // Formatea según locale español
    };

    /**
     * Devuelve un color según el sexo para el badge
     */
    const getBadgeColor = (sexo) => {
        switch (sexo) {
            case 'M': return '#0d6efd';  // Azul Bootstrap
            case 'F': return '#dc3545';  // Rojo Bootstrap
            default: return '#6c757d';   // Gris Bootstrap
        }
    };

    /**
     * Formatea un número como moneda europea
     * 1500.50 → "1.500,50 €"
     */
    const formatearSueldo = (sueldo) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(sueldo);
    };

    // ────────────────────────────────────────────────────────────────────────
    // RENDERIZADO (JSX)
    // JSX es una sintaxis que parece HTML pero es JavaScript
    // Cada componente debe devolver UN solo elemento raíz
    // ────────────────────────────────────────────────────────────────────────

    return (
        // TouchableOpacity: Contenedor que detecta toques
        // onPress: Función a ejecutar cuando se pulsa
        // activeOpacity: Opacidad durante el toque (0.7 = 70%)
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>

            {/* View: Contenedor principal de la tarjeta */}
            {/* style={styles.card}: Aplica los estilos definidos abajo */}
            <View style={styles.card}>

                {/* ══════════════ CABECERA ══════════════ */}
                <View style={styles.header}>
                    {/* Muestra el nombre del vendedor */}
                    {/* {vendedor.nombre}: Interpola el valor de la variable */}
                    <Text style={styles.nombre}>{vendedor.nombre}</Text>

                    {/* Badge con el sexo */}
                    {/* style={[...]} permite combinar múltiples estilos */}
                    {/* El color de fondo se calcula dinámicamente */}
                    <View style={[
                        styles.badge,
                        { backgroundColor: getBadgeColor(vendedor.sexo) }
                    ]}>
                        <Text style={styles.badgeText}>
                            {/* Operador ternario: condición ? si_true : si_false */}
                            {vendedor.sexo === 'M' ? 'Masculino' :
                                vendedor.sexo === 'F' ? 'Femenino' : 'Otro'}
                        </Text>
                    </View>
                </View>

                {/* ══════════════ CONTENIDO ══════════════ */}
                <View style={styles.content}>
                    {/* Fila NIF */}
                    <View style={styles.row}>
                        <Text style={styles.label}>NIF:</Text>
                        <Text style={styles.value}>{vendedor.nif}</Text>
                    </View>

                    {/* Fila Fecha */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha Nac.:</Text>
                        <Text style={styles.value}>
                            {formatearFecha(vendedor.fecha_nac)}
                        </Text>
                    </View>

                    {/* Fila Sueldo */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Sueldo:</Text>
                        {/* Se aplican dos estilos: value y sueldo */}
                        <Text style={[styles.value, styles.sueldo]}>
                            {formatearSueldo(vendedor.sueldo_base)}
                        </Text>
                    </View>
                </View>

                {/* ID en la esquina (decorativo) */}
                <Text style={styles.id}>#{vendedor.id}</Text>
            </View>
        </TouchableOpacity>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// ESTILOS
// ════════════════════════════════════════════════════════════════════════════

/**
 * StyleSheet.create() crea estilos optimizados
 * 
 * DIFERENCIAS CON CSS:
 * - camelCase en lugar de kebab-case: backgroundColor vs background-color
 * - No hay unidades: padding: 15 (no 15px)
 * - flexbox por defecto: flexDirection: 'column' es el default
 * - Algunos nombres diferentes: fontWeight acepta strings como 'bold'
 */
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,           // Esquinas redondeadas
        padding: 15,                // Espacio interior
        marginHorizontal: 15,       // Margen izquierda y derecha
        marginVertical: 8,          // Margen arriba y abajo
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Sombra para Android
        elevation: 3,
        // Para posicionar el ID en la esquina
        position: 'relative',
    },
    header: {
        flexDirection: 'row',       // Elementos en horizontal
        justifyContent: 'space-between',  // Espacio entre elementos
        alignItems: 'center',       // Centrado vertical
        marginBottom: 10,
        borderBottomWidth: 1,       // Línea separadora
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,                    // Ocupa el espacio disponible
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,           // Bordes muy redondeados (píldora)
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        gap: 5,                     // Espacio entre filas (React Native 0.71+)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#666',
        fontSize: 14,
    },
    value: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
    sueldo: {
        color: '#28a745',           // Verde
        fontWeight: 'bold',
    },
    id: {
        position: 'absolute',       // Posición absoluta
        top: 5,
        right: 10,
        color: '#ccc',
        fontSize: 12,
    },
});

// ════════════════════════════════════════════════════════════════════════════
// EXPORTACIÓN
// ════════════════════════════════════════════════════════════════════════════

// export default: Permite importar este componente desde otros archivos
// Uso: import VendedorCard from './components/VendedorCard';
export default VendedorCard;