import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const request = async (path, options = {}) => {
    const { method = 'GET', body, isAuth = false } = options;

    const headers = { 'Content-Type': 'application/json' };

    if (isAuth) {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || data.error || 'Error en la peticion');
    }

    return data;
};

export const login = async (email, password) => {
    return request('/auth/login', { method: 'POST', body: { email, password } });
};

export const register = async (nombre, email, password) => {
    return request('/auth/registro', { method: 'POST', body: { nombre, email, password } });
};

export const getVehiculos = async () => {
    return request('/vehiculos', { isAuth: true });
};

export const getVehiculosDisponibles = async () => {
    return request('/vehiculos?estado=disponible', { isAuth: true });
};

export const getVehiculoPorId = async (id) => {
    return request(`/vehiculos/${id}`, { isAuth: true });
};

export const createVehiculo = async (Vehiculo) => {
    return request('/vehiculos', { method: 'POST', body: Vehiculo, isAuth: true });
};

export const eliminarVehiculo = async (id) => {
    return request(`/vehiculos/${id}`, { method: 'DELETE', isAuth: true });
};

export const getVentas = async () => {
    return request('/ventas', { isAuth: true });
};

export const createVenta = async (datosVenta) => {
    return request('/ventas', { method: 'POST', body: datosVenta, isAuth: true });
};