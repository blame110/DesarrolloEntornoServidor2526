import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


/**
 * Componente que muestra una tarjeta con los datos de un vendedor
 */

const VendedorCard = ({ vendedor, onPress }) => {


    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
        if (!fecha) return 'N/A';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES');
    };
    // Función para obtener el color del badge según el sexo
    const getBadgeColor = (sexo) => {
        switch (sexo) {
            case 'M': return '#26e23c';  // Azul
            case 'F': return '#b922aa';  // Rojo
            default: return '#6c757d';   // Gris
        }
    };
    // Función para formatear el sueldo
    const formatearSueldo = (sueldo) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(sueldo);
    };
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={styles.card}>
                {/* Cabecera con nombre y badge */}
                <View style={styles.header}>
                    <Text style={styles.nombre}>{vendedor.nombre}</Text>
                    <View style={[styles.badge, { backgroundColor: getBadgeColor(vendedor.sexo) }]}>
                        <Text style={styles.badgeText}>
                            {vendedor.sexo === 'M' ? 'Masculino' :
                                vendedor.sexo === 'F' ? 'Femenino' : 'Otro'}
                        </Text>
                    </View>
                </View>


                {/* Contenido */}
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.label}>NIF:</Text>
                        <Text style={styles.value}>{vendedor.nif}</Text>
                    </View>


                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha Nac.:</Text>
                        <Text style={styles.value}>{formatearFecha(vendedor.fecha_nac)}</Text>
                    </View>


                    <View style={styles.row}>
                        <Text style={styles.label}>Sueldo:</Text>
                        <Text style={[styles.value, styles.sueldo]}>
                            {formatearSueldo(vendedor.sueldo_base)}
                        </Text>
                    </View>
                </View>


                {/* ID pequeño en la esquina */}
                <Text style={styles.id}>#{vendedor.id}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,  // Sombra en Android
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        gap: 5,
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
        color: '#28a745',
        fontWeight: 'bold',
    },
    id: {
        position: 'absolute',
        top: 5,
        right: 10,
        color: '#ccc',
        fontSize: 12,
    },
});


export default VendedorCard;
