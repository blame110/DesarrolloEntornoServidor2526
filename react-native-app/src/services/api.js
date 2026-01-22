// ════════════════════════════════════════════════════════════════════════════
// SERVICIO API - CRUD COMPLETO
// ════════════════════════════════════════════════════════════════════════════

import { API_URL } from '../config/config';

// ────────────────────────────────────────────────────────────────────────────
// OBTENER LISTA DE VENDEDORES (READ - Listar)
// GET /api/vendedores
// ────────────────────────────────────────────────────────────────────────────
export const getVendedores = async (page = 1, perPage = 10) => {
    try {
        const url = `${API_URL}/vendedores?page=${page}&per_page=${perPage}`;
        console.log('GET:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error en getVendedores:', error);
        throw error;
    }
};

// ────────────────────────────────────────────────────────────────────────────
// OBTENER UN VENDEDOR (READ - Detalle)
// GET /api/vendedores/{id}
// ────────────────────────────────────────────────────────────────────────────
export const getVendedor = async (id) => {
    try {
        const url = `${API_URL}/vendedores/${id}`;
        console.log('GET:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Vendedor no encontrado');
        }

        return await response.json();

    } catch (error) {
        console.error('Error en getVendedor:', error);
        throw error;
    }
};

// ────────────────────────────────────────────────────────────────────────────
// CREAR VENDEDOR (CREATE)
// POST /api/vendedores
// ────────────────────────────────────────────────────────────────────────────
export const crearVendedor = async (datosVendedor) => {
    try {
        const url = `${API_URL}/vendedores`;
        console.log('POST:', url);
        console.log('Datos:', datosVendedor);

        const response = await fetch(url, {
            method: 'POST',  // POST para crear
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: Convertimos el objeto JavaScript a JSON string
            body: JSON.stringify(datosVendedor),
        });

        // Obtenemos la respuesta como JSON
        const data = await response.json();

        // Si hay errores de validación (422), los incluimos en el error
        if (!response.ok) {
            const error = new Error(data.message || 'Error al crear vendedor');
            error.errores = data.errors;  // Errores de validación de Laravel
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error en crearVendedor:', error);
        throw error;
    }
};

// ────────────────────────────────────────────────────────────────────────────
// ACTUALIZAR VENDEDOR (UPDATE)
// PUT /api/vendedores/{id}
// ────────────────────────────────────────────────────────────────────────────
export const actualizarVendedor = async (id, datosVendedor) => {
    try {
        const url = `${API_URL}/vendedores/${id}`;
        console.log('PUT:', url);
        console.log('Datos:', datosVendedor);

        const response = await fetch(url, {
            method: 'PUT',  // PUT para actualizar
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosVendedor),
        });

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(data.message || 'Error al actualizar vendedor');
            error.errores = data.errors;
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error en actualizarVendedor:', error);
        throw error;
    }
};

// ────────────────────────────────────────────────────────────────────────────
// ELIMINAR VENDEDOR (DELETE)
// DELETE /api/vendedores/{id}
// ────────────────────────────────────────────────────────────────────────────
export const eliminarVendedor = async (id) => {
    try {
        const url = `${API_URL}/vendedores/${id}`;
        console.log('DELETE:', url);

        const response = await fetch(url, {
            method: 'DELETE',  // DELETE para eliminar
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar vendedor');
        }

        return await response.json();

    } catch (error) {
        console.error('Error en eliminarVendedor:', error);
        throw error;
    }
};