import React, { useEffect } from "react";
import { View, TouchableOpacity, } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";


export default function DescritorVariacaoLinguistica() {
  const navigation = useNavigation();

  const route = useRoute()

  const id = route.params.id

  console.log(id)

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  });

  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
      style={Styles.gradient} >

      <View style={Styles.container}>
        <View style={Styles.voltar}>
          <TouchableOpacity style={Styles.paginationButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <Descritores titulo='Identificação das marcas linguísticas que evidenciam o locutor e o interlocutor de um texto' descritor='D10' id={id} />


      </View>




    </LinearGradient>
  )
}