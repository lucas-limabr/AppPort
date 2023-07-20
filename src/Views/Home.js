import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesHome";





function logar(email,senha){
  Alert.alert('Cadastro', `${email}, ${senha}`, [
      {
          text: 'ok',

      }
     
  ])

}

export default function Home() { 
  
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <Image
          style={Styles.mascote}
          source={require("../Imagens/Levri_9Update4.gif")} 
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
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={true}
          />
        </View>

        <View style={Styles.containerBotao}>
          <TouchableOpacity style={Styles.botao} onPress={() => logar(email,senha)}>
            <Text style={Styles.txtBotao}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}
