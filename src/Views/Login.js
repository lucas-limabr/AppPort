import React from "react";
import {View, Image, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLogin";


export default function Login() {
    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >
            <View style={Styles.container}>

            <Image style = {Styles.imageNome} source={require('../Imagens/NomePortuguito.png')} />

            <View>
            <TouchableOpacity style={Styles.botaoGrande}>
                <Text style = {Styles.textBotao}>Login</Text>
            </TouchableOpacity>
            </View>

            <View style={Styles.containerFilho}>
                <TouchableOpacity style={Styles.botaoPequeno}>
                    <Text style = {Styles.textBotaoPequeno}>Cadastrar</Text>
                </TouchableOpacity>

            </View>

            <Text style={Styles.frase}>Aprender pode ser divertido</Text>

            </View>

            <Image style = {Styles.imageLogo} source={require('../Imagens/Levri_8.gif')} />

         </LinearGradient>
    )
}