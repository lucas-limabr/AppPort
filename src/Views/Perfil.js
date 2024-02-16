import React, { useContext, useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesPerfil";
import { onAuthStateChanged } from 'firebase/auth';
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { UserContext } from "../Contexts/auth";
import { format, differenceInCalendarDays } from "date-fns";

export default function Perfil(){
    const [usuario, setUsuario] = useState();
    const [user,setUser] = useState()
  
    const data = new Date

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
        

            <LinearGradient colors={['#D5D4FB', '#9B98FC']}
            style={Styles.gradient} >

            <View style={Styles.container}>



                <View style={Styles.backgroundUser}>

                <Image style={Styles.image}  source={require('../Imagens/defaultUser.png')} />
                </View>


                

                <TouchableOpacity style={[Styles.botao, Styles.sombra]}>
                    <Text style={Styles.txtBotao}>Alterar foto</Text>
                </TouchableOpacity>

                <View style={Styles.containerFilho}>

                <TextInput style={Styles.input}>
                        <Text style={Styles.txtInput}>Nome: {usuario ? usuario.nome : "" }</Text>
                </TextInput>
                </View>
                

                <View style={Styles.containerFilho}>

                <TextInput style={Styles.input}>
                        <Text style={Styles.txtInput}>E-mail: {usuario ? usuario.email : ""}</Text>
                </TextInput>
                </View>
            
                



            </View>

            </LinearGradient>
        
    )
}