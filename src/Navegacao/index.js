import React from "react";
import { SafeAreaView } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import TabNav from "./TabNav";
import LoginNav from "./LoginNav";

import { useFonts, Inder_400Regular } from "@expo-google-fonts/inder"
import { useAuthentication } from "../hooks/useAutentication";


export default function Navegacao() {
    const user = useAuthentication();
    console.log(`Usuario: ${user?.email}`);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                {
                    user ? <TabNav /> : <LoginNav />
                }
            </NavigationContainer>
        </SafeAreaView>
    )
}