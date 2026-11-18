import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useVehiculos } from "../../features/hooks/useVehiculos";
import { useVentas } from "../../features/hooks/useVentas";

export default function DetalleVehiculoScreen() {
    const router = useRouter();
    const { vehiculo, loading, cargarVehiculoDetalle , cargarVehiculos} = useVehiculos();
    const { handleComprar, loading: comprando } = useVentas();

    const obtenerDetalle = async () => {
        try {
            const id = await AsyncStorage.getItem("vehiculoId");
            if (id) {
                await cargarVehiculoDetalle(id);
            }
        } catch (err) {
            Alert.alert("Error", err.message || "No se pudo cargar el vehiculo");
        }
    };

    useEffect(() => {
        obtenerDetalle();
    }, []);

    const confirmarCompra = () => {
        Alert.alert(
            "Confirmar Compra", "Vas a querer comprar este vehiculo por transferencia?",
            [
                { text: "Cancelar", onPress : cancelarCompra },
                { text: "Confirmar", onPress: realizarCompra }
            ]
        );
    };
    
    const cancelarCompra = async()=>{
        router.back();
    }

    const realizarCompra = async () => {
        try {
            await handleComprar(vehiculo.id);
            Alert.alert("Completado", "Compra realizada correctamente");
            router.replace("/compras");
            await cargarVehiculoDetalle(vehiculo.id);
            await cargarVehiculos();
        } catch (err) {
            Alert.alert("Error", err.message || "Error al comprar");
        }
    };

    if (loading || !vehiculo) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <View style={styles.btnBox}>
                    <Button title="Volver" onPress={() => router.back()} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle del Vehiculo</Text>

            <View style={styles.card}>
                <Text style={styles.bold}>{vehiculo.marca} {vehiculo.modelo}</Text>
                <Text>ID: {vehiculo.id}</Text>
                <Text>Anio: {vehiculo.anio}</Text>
                <Text>Precio: ${vehiculo.precio}</Text>
                <Text>Estado: {vehiculo.estado}</Text>
            </View>

            {vehiculo.estado === "disponible" ? (
                <View style={styles.btnBox}>
                    <Button
                        title={comprando ? "Esperando..." : "Comprar"}
                        onPress={confirmarCompra}
                        disabled={comprando}
                    />
                </View>
            ) : null}

            <View style={styles.separador} />

            <View style={styles.btnBox}>
                <Button title="Volver a ver los vehiculos" onPress={() => router.back()} />
            </View>
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
    separador: { height: 1, backgroundColor: '#eee', marginVertical: 15 }
});