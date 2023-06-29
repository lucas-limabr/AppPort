import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../Styles.js/StylesMenu";
import ButtonDescritores from "../Buttons/ButtonDescritores";


export default function Descritores() {
  return (
    <View style={Styles.containerFilho}>

      <ButtonDescritores/>
      <ButtonDescritores/>

    </View>
  );
}
