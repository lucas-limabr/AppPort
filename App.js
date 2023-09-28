import React, { useState, useEffect } from "react";
import { useFonts, Inder_400Regular } from "@expo-google-fonts/inder"
import Navegacao from "./src/Navegacao";
import { UserProvider } from "./src/Contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [fontLoaded] = useFonts({
    'Inder_400Regular': Inder_400Regular,
  });

  const [login, setLogin] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  useEffect(() => {
    const localStorage = async (nome, email, urlImagemPerfil) => {
      
    }

    localStorage('nome', 'email', 'urlImagemPerfil')

    if (!usuario) {
      AsyncStorage.getItem('@portuguito2023')
        .then(usuarioString => {
          if (usuarioString) {
            const usuario = JSON.parse(usuarioString);
            setUsuario(usuario);
            setUsuarioAtual(usuario)
          }
        })
        .catch(error => {
          console.error("Erro ao obter usuário do AsyncStorage:", error);
        });
    }
  }, [usuario]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <UserProvider value={{usuarioAtual}}>
      <Navegacao/>
    </UserProvider>
  );
}
