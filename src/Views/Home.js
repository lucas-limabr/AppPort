import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesHome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  getFirestore,
  
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";






export default function Home() { 

  const db = getFirestore(FIREBASE_APP)

  const navigation = useNavigation()
  
  const signIn = async (auth,email,senha) => {
    try{
      const resposta = await signInWithEmailAndPassword(auth, email, senha)
      
    } catch(error){
      Alert.alert('erro ' + error.message)
    }
  }



  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const auth = FIREBASE_AUTH

  return (
    <LinearGradient colors={["#D5D4FB", 
    "#9B98FC"]} style={Styles.gradient}>
      <ScrollView>

      <View style={Styles.container}>
        <Image
          style={Styles.mascote}
          source={require("../Imagens/Levri1.gif")} 
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
          <TouchableOpacity style={Styles.botao} onPress={() => signIn(auth,email,senha)}>
            <Text style={Styles.txtBotao}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
      </ScrollView>
    </LinearGradient>
  );
}
