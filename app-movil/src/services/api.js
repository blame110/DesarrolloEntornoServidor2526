import { API_URL } from '../config/config';

/**
 * Servicio para comunicarse con la API de Laravel
 */

// Obtener lista de vendedores
export const getVendedores = async (page = 1, perPage = 10) => {
    try {
        const response = await fetch(
            `${API_URL}/vendedor?page=${page}&per_page=${perPage}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );


        if (!response.ok) {
            throw new Error(`Error al obtener vendedores ${API_URL}/vendedor?page=${page}&per_page=${perPage}`);
        }


        const data = await response.json();
        return data;


    } catch (error) {
        console.error('Error en getVendedores:', error);
        throw error;
    }
};


// Obtener un vendedor por ID
export const getVendedor = async (id) => {
    try {
        const response = await fetch(`${API_URL}/vendedores/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });


        if (!response.ok) {
            throw new Error('Vendedor no encontrado');
        }


        const data = await response.json();
        return data;


    } catch (error) {
        console.error('Error en getVendedor:', error);
        throw error;
    }
};
