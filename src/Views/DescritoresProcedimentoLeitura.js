import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

export default function DescritoresProcedimentoLeitura() {
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="caretleft" size={50} color="#F54F59" />
          </TouchableOpacity>
        </View>
        <Descritores
          titulo="Localização de informações explícitas"
          descritor="D1"
          id={id}
        />
        <Descritores titulo="Inferência de sentido" descritor="D3" id={id}/>
        <Descritores
          titulo="Inferência de informação implícita"
          descritor="D4"
          id={id}
        />
        <Descritores titulo="Identificação do tema do texto" descritor="D6" id={id}/>
        <Descritores titulo="Distinção entre fato e opinião" descritor="D11" id={id}/>
      </View>
    </LinearGradient>
  );
}
