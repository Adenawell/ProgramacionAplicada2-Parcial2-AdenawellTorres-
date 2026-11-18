import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, loading } = useContext(AuthContext);
    const router = useRouter();

    const iniciarSesion = async () => {

        if(!email || !password){
            Alert.alert("Error", "Faltan Datos");
            return;
        }
        
        

        try {
            await handleLogin(email, password);
            router.replace("/vehiculos");
        } catch (err) {
            Alert.alert("Error", err.message || "Error al iniciar sesion");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 20 }}>
                <Text style={styles.title}>Iniciar Sesion</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <View style={styles.btnBox}>
                    <Button
                        title={loading ? "Cargando..." : "Iniciar Sesion"}
                        onPress={iniciarSesion}
                        disabled={loading}
                    />
                </View>

                <View style={styles.separator} />

                <View style={styles.btnBox}>
                    <Button
                        title="Crear una cuenta"
                        onPress={() => router.push("/auth/register")}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#000' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 5, color: '#000' },
    card: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 10, borderRadius: 5 },
    bold: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#000' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    btnBox: { marginTop: 10 },
    separator: { height: 1, backgroundColor: '#eee', marginVertical: 15 }
});