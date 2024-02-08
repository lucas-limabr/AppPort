import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Styles from "../Styles.js/StylesMenuTrilha";
import { useNavigation } from "@react-navigation/native";

export default function MenuTrilha() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/Trilha_Esborco2_2.png")}
    >
    

      <StatusBar style="auto" />
      <View style={Styles.cor}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SubMenu2")}>
            <ImageBackground
              source={require("../Imagens/Placa4.png")}
              style={Styles.buttom}
            >
              <Text style={Styles.textButtom}>Morfologia</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SubMenu3")}>
            <ImageBackground
              source={require("../Imagens/Placa4.png")}
              style={Styles.buttom}
            >
              <Text style={Styles.textButtom}>Ortografia</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SubMenu1")}>
            <ImageBackground
              source={require("../Imagens/Placa4.png")}
              style={Styles.buttom}
            >
              <Text style={Styles.textButtom}>Sintaxe</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    
    </ImageBackground>
  );
}
