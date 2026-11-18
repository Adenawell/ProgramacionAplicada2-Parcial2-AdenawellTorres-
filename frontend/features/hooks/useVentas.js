import { useState, useEffect } from "react";
import { getVentas, createVenta } from "../../services/api.js";

export const useVentas = () => {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cargarCompras = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getVentas();
            setCompras(res.data || res);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleComprar = async (vehiculoId) => {
        try {
            setLoading(true);
            setError(null);
            const res = await createVenta({
                vehiculoId: Number(vehiculoId),
                metodoPago: "transferencia por AdenawellBank"
            });
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCompras();
    }, []);

    return {
        compras,
        loading,
        error,
        cargarCompras,
        handleComprar
    };
};