import React, {useEffect} from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function DescritorRelacoesEntreRecursosExpressivos() {
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
        <Descritores
          titulo="Identificação dos efeitos de ironia ou humor em textos variados"
          descritor="D13"
          id={id}
        />
        <Descritores
          titulo="Identificação do efeito de sentido decorrente do uso da pontuação e de outras notações"
          descritor="D14"
          id={id}
        />
      </View>
    </LinearGradient>
  );
}
