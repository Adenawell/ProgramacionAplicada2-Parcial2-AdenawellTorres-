import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function RegisterScreen() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleRegistro, loading } = useContext(AuthContext);
    const router = useRouter();

    const registrar = async () => {

        if (!nombre || !email || !password) {
            Alert.alert("Error", "Faltan Datos");
            return;
        }

        if(nombre.length < 2){
            Alert.alert("Error", "El nombre esta muy corto");
            return;
        }

        if (!email.includes("@gmail.com") && !email.includes("@hotmail.com")) {
            Alert.alert("Error", "El email debe ser de Gmail o Hotmail");
            return;
        }

        if(password.length < 4){
            Alert.alert("Error", "La contrasena es muy corta")
            return;
        }



        try {
            const data = await handleRegistro(nombre, email, password);
            Alert.alert("Exito", "Usuario registrado correctamente");
            if (data && data.token) {
                router.replace("/vehiculos");
            } else {
                router.replace("/auth/login");
            }
        } catch (err) {
            Alert.alert("Error", err.message || "Error al registrarse");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.safearea}>
                <Text style={styles.title}>Registrarse</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor="#666"
                    value={nombre}
                    onChangeText={setNombre}
                />

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
                        title={loading ? "Registrando..." : "Registrarse"}
                        onPress={registrar}
                        disabled={loading}
                    />
                </View>

                <View style={styles.separator} />

                <View style={styles.btnBox}>
                    <Button
                        title="Volver al Login"
                        onPress={() => router.back()}
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
    separator: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    safearea: {padding: 20}
});