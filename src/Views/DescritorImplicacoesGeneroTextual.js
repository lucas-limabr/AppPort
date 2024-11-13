import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function DescritorImplicacoesGeneroTextual() {
  const navigation = useNavigation();

  const route = useRoute()

  const id = route.params.id

  console.log(id)

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
        <Descritores titulo="Interpretação de texto com auxílio de material gráfico diverso" descritor="D5" id={id} />
        <Descritores
          titulo="Reconhecimento do gênero discursivo"
          descritor="D16"
          id={id}
        />
        <Descritores
          titulo="Identificação da finalidade de textos de diferentes gêneros"
          descritor="D9"
          id={id}
        />
      </View>
    </LinearGradient>
  );
}
