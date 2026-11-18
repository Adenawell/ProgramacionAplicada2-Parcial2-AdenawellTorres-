import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function Index() {
    const { token, checkearSession } = useContext(AuthContext);

    if (checkearSession) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (token) {
        return <Redirect href="/vehiculos" />;
    }

    return <Redirect href="/auth/login" />;
}