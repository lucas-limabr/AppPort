import React from "react";
import Home from "./src/Views/Home";
import { useFonts, Inder_400Regular } from "@expo-google-fonts/inder"
import Cadastro from "./src/Views/Cadastro";
import Listas from "./src/Views/Listas";
import Login from "./src/Views/Login";
import Menu from "./src/Views/Menu";
import Perfil from "./src/Views/Perfil";
import Navegacao from "./src/Navigation/StackNavigation"


export default function App() {
    const [fontLoaded] = useFonts({
        'Inder_400Regular': Inder_400Regular,
      });
    
      if (!fontLoaded) {
        return null;
      }


    return (
        <Navegacao/>
    )
}