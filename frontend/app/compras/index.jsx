import React, { useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useVentas } from "../../features/hooks/useVentas";

export default function MisComprasScreen() {
    const { compras, loading, error, cargarCompras } = useVentas();
    const router = useRouter();

    useEffect(() => {
        if (error) {
            Alert.alert("Error", error);
        }
    }, [error]);

    useEffect(() =>{
        cargarCompras();
    }, []);

    

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Mis Compras</Text>
                <Button title="Volver" onPress={() => router.back()} />
            </View>

            <View style={styles.separator} />

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            
            <FlatList
                data={compras} 
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.bold}>
                            {item.vehiculo
                                ? `${item.vehiculo.marca} ${item.vehiculo.modelo}`
                                : `Vehiculo ID: ${item.vehiculoId}`}
                        </Text>
                        <Text>Monto: ${item.monto}</Text>
                        <Text>Metodo de pago: {item.metodoPago}</Text>
                        <Text>Fecha: {item.fecha || item.createdAt}</Text>
                    </View>
                )}
            />
            
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
    separator: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    vacio: { textAlign: 'center', marginTop: 30, fontSize: 16, color: '#666' },
});