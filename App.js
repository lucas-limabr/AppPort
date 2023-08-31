import React, { useState } from "react";
import { useFonts, Inder_400Regular } from "@expo-google-fonts/inder"
import Navegacao from "./src/Navegacao";
import { Inicio } from "./src/Navegacao/StackNav";
import Cadastro from "./src/Views/Cadastro";
import Login from "./src/Views/Login";





export default function App() {
  const [login, setLogin] = useState(false)

  const [fontLoaded] = useFonts({
    'Inder_400Regular': Inder_400Regular,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
      <>
          { login ? <Navegacao/> : <Inicio/> }
      </>
  )
}