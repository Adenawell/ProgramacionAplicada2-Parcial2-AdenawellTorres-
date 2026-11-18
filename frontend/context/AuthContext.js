import React, { useEffect, createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [checkearSession, setCheakerSession] = useState(true);

    const verificarToken = async () => {
        try {
            setError(null);
            setCheakerSession(true);

            const tokenGuardado = await AsyncStorage.getItem("token");

            if (!tokenGuardado) {
                return;
            }

            const decodeToken = jwtDecode(tokenGuardado);

            setToken(tokenGuardado);

            setUser({
                id: decodeToken.id,
                nombre: decodeToken.nombre,
                email: decodeToken.email,
                rol: decodeToken.rol
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setCheakerSession(false);
        }
    };

    useEffect(() => {
        verificarToken();
    }, []);

    const guardarToken = async (newToken) => {
        try {
            if (!newToken) return;

            await AsyncStorage.setItem("token", newToken);
            const decodeToken = jwtDecode(newToken);

            setToken(newToken);

            setUser({
                id: decodeToken.id,
                nombre: decodeToken.nombre,
                email: decodeToken.email,
                rol: decodeToken.rol
            });
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const handleRegistro = async (nombre, email, password) => {
        try {
            setLoading(true);
            setError(null);

            const data = await register(nombre, email, password);

            if (!data) {
                return;
            }

            if (data.token) {
                await guardarToken(data.token);
            }

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const data = await login(email, password);

            if (!data) {
                return;
            }

            await guardarToken(data.token);

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            setToken(null);
            setUser(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                error,
                loading,
                checkearSession,
                verificarToken,
                handleLogin,
                handleRegistro,
                logout,
                guardarToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};