import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

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
          <TouchableOpacity style={Styles.paginationButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <Descritores
          titulo="Estabelecimento de relações entre partes de um texto"
          descritor="D2"
          id={id}
        />
        <Descritores
          titulo="Identificação do conflito gerador do enredo e os elementos que constroem a narrativa"
          descritor="D7"
          id={id}
        />
        <Descritores
          titulo="Estabelecimento de relação causa/consequência entre partes e elementos do texto"
          descritor="D8"
          id={id}
        />
        <Descritores
          titulo="Estabelecimento das relações lógico-discursivas presentes no texto"
          descritor="D12"
          id={id}
        />
      </View>
    </LinearGradient>
  );
}
