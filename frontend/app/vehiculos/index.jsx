import React, { useContext, useEffect , useCallback } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter , useFocusEffect} from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { useVehiculos } from "../../features/hooks/useVehiculos";

export default function VehiculosScreen() {

    const { logout } = useContext(AuthContext);
    const { vehiculos, loading, error, cargarVehiculos, cargarDisponibles } = useVehiculos();
    const router = useRouter();

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error);
        }
    }, [error]);

    useFocusEffect(
        useCallback(() =>{
            cargarVehiculos();
        }, [])
    );

    const cerrarSesion = async () => {
        await logout();
        router.replace("/auth/login");
    };

    const irADetalle = async (id) => {
        await AsyncStorage.setItem("vehiculoId", id.toString());
        router.push("/vehiculos/detalle");
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Lista de Vehiculos</Text>
                <Button title="Salir" color="red" onPress={cerrarSesion} />
            </View>

            <View style={styles.row}>
                <Button title="Ver Todos" onPress={cargarVehiculos} />
                <Button title="Solo Disponibles" onPress={cargarDisponibles} />
                <Button title="Mis Compras" onPress={() => router.push("/compras")} />
            </View>

            <View style={styles.separator} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={vehiculos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => irADetalle(item.id)}
                        >
                            <Text style={styles.bold}>{item.marca} {item.modelo}</Text>
                            <Text>Anio: {item.anio}</Text>
                            <Text>Precio: ${item.precio}</Text>
                            <Text>Estado: {item.estado}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#000' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 5, color: '#000' },
    card: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 10, borderRadius: 5 },
    bold: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#000' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    btnBox: { marginTop: 10 },
    separator: { height: 1, backgroundColor: '#eee', marginVertical: 15 }
});