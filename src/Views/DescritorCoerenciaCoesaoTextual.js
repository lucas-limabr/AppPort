import React, {useEffect} from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

export default function DescritorCoerenciaCoesaoTextual() {
    const navigation = useNavigation();

    const route = useRoute()

    const id = route.params.id
    
  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  });
  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
      <View style={Styles.voltar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="caretleft" size={50} color="#F54F59" />
          </TouchableOpacity>
        </View>
        <Descritores
          titulo="Estabelecimento de relações entre partes de um texto"
          descritor="D2"
          id={id}
        />
        <Descritores
          titulo="Identificação do confilito gerador do enredo"
          descritor="D7"
          id={id}
        />
        <Descritores
          titulo="Estabelecimento de relação entre partes do texto"
          descritor="D8"
          id={id}
        />
        <Descritores
          titulo="Estabelecimento das relações lógico-discursivas"
          descritor="D12"
          id={id}
        />
      </View>
    </LinearGradient>
  );
}
