import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import TabNav from "./TabNav";
import LoginNav from "./LoginNav";
import TabNavAluno from "./TabNavAluno";
import { View, Image } from "react-native";
import { useAuthentication } from "../hooks/useAutentication";
import { userVerification } from "../FuncoesFirebase/Funcoes";
import { updateDay } from "../FuncoesFirebase/Funcoes";

export default function Navegacao() {
  const user = useAuthentication();

  const [isProfessor, setIsProfessor] = useState(null);

  useEffect(() => {
    const fetchVerification = async () => {
      const result = await userVerification(user?.email);
      setIsProfessor(result);
      updateDay(user.email)
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
          user !== null ? (
            user ? (
              isProfessor ? <TabNav /> : <TabNavAluno />
            ) : (
              <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: "100%",
                    height: undefined,
                    aspectRatio: 1,
                  }}
                  source={require("../Imagens/Nuvem_3(uPDATE).gif")}
                  resizeMode="contain"
                />
              </View>

            )
          ) : (
            <LoginNav />
          )
        }
      </NavigationContainer>
    </SafeAreaView>
  )
}