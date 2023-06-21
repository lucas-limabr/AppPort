import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesHome";

export default function Home() {
  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <Image
          style={Styles.mascote}
          source={require("../Imagens/Levri_9gifSemFundo1.gif")}
        />

        <Text style={Styles.frase}>Bem-vindo de volta</Text>

        <View style={Styles.containerFilho}>
          <Text style={Styles.txtInput}>E-mail:</Text>
          <TextInput
            style={Styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={Styles.containerFilho}>
          <Text style={Styles.txtInput}>Senha:</Text>
          <TextInput
            style={Styles.input}
            onChangeText={(senha) => setEmail(senha)}
          />
        </View>

        <View style={Styles.containerBotao}>
          <TouchableOpacity style={Styles.botao}>
            <Text style={Styles.txtBotao}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}
