import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesPerfil";
import { onAuthStateChanged } from 'firebase/auth';
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { getAuth, signOut } from "firebase/auth";

export default function Perfil() {
  //armazena os dados do usuário obtidos do Firestore (através da função getInfoUser), como nome e email
  const [usuario, setUsuario] = useState();

  const logout = () => {
    const auth = getAuth();

    signOut(auth)
  }

  useEffect(() => {
    const fetchData = async (user) => {
      try {
        const usuario = await getInfoUser(user.email);
        setUsuario(usuario);
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
      }
    };

    //sempre que o estado de autenticação mudar (após o login ou logout), esta função é acionada, verificando se há um usuário autenticado. onAuthStateChanged é um listener que escuta pela mudança de autenticação o tempo todo
    //a função onAuthStateChanged retorna outra função que desinscreve o listener. Isso significa que quando você chama a função retornada, você cancela a escuta contínua de mudanças no estado de autenticação
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchData(user);
      }
    });

    //return dentro do useEffect é usado para definir uma função de limpeza (cleanup function)
    return () => {
      //garante que o listener de onAuthStateChanged seja removido quando o componente for desmontado
      unsubscribeFromAuthStateChanged();
    };
  }, []);

  return (
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
      style={Styles.gradient} >
      <View style={Styles.container}>
        <View style={Styles.backgroundUser}>
          <Image style={Styles.image} source={require('../Imagens/portuguita_profile.jpg')} />
        </View>
        <TouchableOpacity style={[Styles.botao, Styles.sombra]} onPress={() => logout()}>
          <Text style={Styles.txtBotao}>Sair</Text>
        </TouchableOpacity>
        <View style={Styles.containerFilho}>
          <View style={Styles.input}>
            <Text style={Styles.txtInput}>Nome: {usuario ? usuario.nome : ""}</Text>
          </View>
        </View>
        <View style={Styles.containerFilho}>
          <View style={[Styles.input, Styles.campoEmail]}>
            <Text style={Styles.txtInput}>E-mail: {usuario ? usuario.email : ""}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}