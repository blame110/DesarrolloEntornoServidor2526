// Configuración de la API
r
// Para emulador Android usa: 10.0.2.2
// Para dispositivo físico usa: la IP de tu ordenador (ej: 192.168.1.100)
// Para iOS simulador usa: localhost

const getApiUrl = () => {
    // Cambia esto según tu entorno
    const IP_ORDENADOR = '10.32.60.62';  // Tu IP local
    const PUERTO = '8000';

    // Si estás probando en web
    if (typeof window !== 'undefined' && window.location) {
        return `http://localhost:${PUERTO}/api`;
    }

    // Para dispositivo móvil
    return `http://${IP_ORDENADOR}:${PUERTO}/api`;
};

export const API_URL = getApiUrl();


// O simplemente (ajusta la IP):
// export const API_URL = 'http://192.168.1.100:8000/api';
