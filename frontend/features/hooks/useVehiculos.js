import { useState, useEffect } from "react";
import { getVehiculos, getVehiculosDisponibles, getVehiculoPorId, createVehiculo, eliminarVehiculo } from "../../services/api.js";

export const useVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [vehiculo, setVehiculo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cargarVehiculos = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getVehiculos();
            setVehiculos(res.data || res);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const cargarDisponibles = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getVehiculosDisponibles();
            setVehiculos(res.data || res);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const cargarVehiculoDetalle = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const res = await getVehiculoPorId(id);
            const data = res.data || res;
            setVehiculo(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleCrearVehiculo = async (datosVehiculo) => {
        try {
            setLoading(true);
            setError(null);
            const res = await createVehiculo(datosVehiculo);
            await cargarVehiculos();
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleEliminarVehiculo = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const res = await eliminarVehiculo(id);
            await cargarVehiculos();
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarVehiculos();
    }, []);

    return {
        vehiculos,
        vehiculo,
        loading,
        error,
        cargarVehiculos,
        cargarDisponibles,
        cargarVehiculoDetalle,
        handleCrearVehiculo,
        handleEliminarVehiculo
    };
};