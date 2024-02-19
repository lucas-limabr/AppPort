import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import Styles from "../Styles.js/StylesPerfilAluno";
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { useAuthentication } from "../hooks/useAutentication";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { format, differenceInCalendarDays } from "date-fns";
import { getAuth, signOut } from "firebase/auth";


export default function PerfilAluno() {
  const [usuario, setUsuario] = useState();
  const [user,setUser] = useState()

  const data = new Date

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
      
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(FIREBASE_AUTH, (user) => {
          if (user) {
            setUser(user);
            fetchData(user);
          } else {
            setUser(null);
          }
        });
      
        return () => {
          unsubscribeFromAuthStateChanged();
        };
      }, []);



  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <View style={Styles.backgroundUser}>
          <Image
            style={Styles.image}
            source={require("../Imagens/defaultUser.png")}
          />
        </View>

        <TouchableOpacity
          style={[Styles.botao, Styles.sombra]}
          onPress={() => logout()}
        >
          <Text style={Styles.txtBotao}>Sair</Text>
        </TouchableOpacity>

        <View style={Styles.containerFilho}>
          <TextInput style={Styles.input}>
            <Text style={Styles.txtInput}>Nome: {usuario ? usuario.nome : ""} </Text>
          </TextInput>
        </View>

        <View style={Styles.containerFilho}>
          <View style={Styles.containerSonAux}>
            <View style={Styles.containerSonAuxFlexbox}>
              <View style={Styles.ViewDados}>
                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Sequência</Text>
                </View>

                <View style={Styles.numberDays}>
                  <Text style={Styles.txtnumberDays}>{usuario ? differenceInCalendarDays(data, usuario.ultimoAcesso.toDate()) : ""}</Text>
                </View>

                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Dias</Text>
                </View>
              </View>

              <View style={Styles.ViewDados}>
                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Desde</Text>
                </View>

                <View style={Styles.numberDays}>
                  <Text style={Styles.txtDate}>{usuario ? format(usuario.dataCadastro.toDate(), "dd/MM/yy") : ""}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={Styles.containerFilho}>
          <TextInput style={Styles.viewOptions}>
            <Text style={Styles.txtInput}>E-mail: {usuario ? usuario.email : ""} </Text>
          </TextInput>
        </View>
      </View>
    </LinearGradient>
  );
}
