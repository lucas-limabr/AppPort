import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../Styles.js/StylesMenu";

const Botao = ({titulo}) => (
  <TouchableOpacity style={Styles.descritores}>
        <Text style={Styles.txtDescritores}>{titulo}</Text>
      </TouchableOpacity>
)

export default function ButtonDescritores({titulo1, titulo2}) {
    return (
      <View style={Styles.containerFilho}>
        <Botao titulo={titulo1}/>
        <Botao titulo={titulo2}/>
      </View>
       
    )
}