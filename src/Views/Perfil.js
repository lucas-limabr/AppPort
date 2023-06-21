import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesPerfil";

export default function Perfil(){
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
                    <Text style={Styles.txtInput}>Nome:</Text>
            </TextInput>
            </View>
            

            <View style={Styles.containerFilho}>

            <TextInput style={Styles.input}>
                    <Text style={Styles.txtInput}>E-mail:</Text>
            </TextInput>
            </View>
           
            



        </View>

        </LinearGradient>
    )
}