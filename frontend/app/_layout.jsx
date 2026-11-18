import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="auth/login" />
                <Stack.Screen name="auth/register" />
                <Stack.Screen name="vehiculos/index" />
                <Stack.Screen name="vehiculos/detalle" />
                <Stack.Screen name="compras/index" />
            </Stack>
        </AuthProvider>
    );
}