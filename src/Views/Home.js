import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesHome";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

export default function Home() {

  const signIn = async (auth, email, senha) => {
    try {
      await signInWithEmailAndPassword(auth, email, senha)

    } catch (error) {
      console.log(error)
      if (error.code === "auth/invalid-email") {
        Alert.alert('Formato de email inválido')
      }
      else if (error.code === "auth/user-not-found") {
        Alert.alert('Email incorreto')
      }
      else if (error.code === "auth/wrong-password") {
        Alert.alert('Senha incorreta')
      }
    }
  }

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const auth = FIREBASE_AUTH

  // Função para redefinir senha
  const resetPassword = async (auth, email) => {
    if (!email) {
      Alert.alert('Por favor, insira o e-mail para redefinição de senha.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'E-mail enviado',
        'Um link para redefinição de senha foi enviado para o endereço fornecido. Por favor, verifique sua caixa de entrada.'
      );
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        Alert.alert('Formato de e-mail inválido.');
      } else if (error.code === "auth/user-not-found") {
        Alert.alert('Usuário não encontrado.');
        console.log(error)
      } else {
        Alert.alert('Erro ao enviar o e-mail. Tente novamente mais tarde.');
      }
    }
  };

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
            <TouchableOpacity style={Styles.botao} onPress={() => signIn(auth, email, senha)}>
              <Text style={Styles.txtBotao}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.containerSmallButton}>
            <TouchableOpacity style={Styles.btnEsqueciSenha} onPress={() => resetPassword(auth, email)}>
              <Text style={Styles.txtEsqueciSenha}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}
