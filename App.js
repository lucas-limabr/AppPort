import React from "react";
import { useFonts, Inder_400Regular } from "@expo-google-fonts/inder"
import Navegacao from "./src/Navegacao";
import { UserProvider } from "./src/Contexts/auth";

export default function App() {
  const [fontLoaded] = useFonts({
    'Inder_400Regular': Inder_400Regular,
  });

  //Se as fontes ainda não estiverem carregadas, o app não renderiza nada
  if (!fontLoaded) {
    return null;
  }

  return (
    //O UserProvider é usado para fornecer o valor atual do usuário para qualquer componente dentro da aplicação
    <UserProvider>
      <Navegacao />
    </UserProvider>
  );
}
