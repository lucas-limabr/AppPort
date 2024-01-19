import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import TabNav from "./TabNav";
import LoginNav from "./LoginNav";
import TabNavAluno from "./TabNavAluno";


import { useFonts, Inder_400Regular } from "@expo-google-fonts/inder"
import { useAuthentication } from "../hooks/useAutentication";
import { userVerification } from "../FuncoesFirebase/Funcoes";
import Login from "../Views/Login";


export default function Navegacao() {
    const user = useAuthentication();

    const [isProfessor, setIsProfessor] = useState(null);

  useEffect(() => {
    const fetchVerification = async () => {
      const result = await userVerification(user?.email);
      setIsProfessor(result);
      console.log(`É professor: ${result}`);
      console.log(`Usuário: ${user?.email}`);
    };

    if (user) {
      fetchVerification();
    }
  }, [user]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                {
                    user ? (
                    isProfessor ? <TabNav /> : <TabNavAluno />)
                    : (
                        <LoginNav/>
                    )
                }
            </NavigationContainer>
        </SafeAreaView>
    )
}