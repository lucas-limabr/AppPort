import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesMenu";
import ButtonDescritores from "../Buttons/ButtonDescritores";

export default function Menu(){
    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >

        <View style={Styles.container}>

           <ButtonDescritores titulo1="Procedimentos de leitura" titulo2='Implicações do gênero textual'/>
           <ButtonDescritores titulo1="Relação entre textos" titulo2='Coerência e Coesão textuais'/>
           <ButtonDescritores titulo1="Relações entre recursos expressivos e efeitos de sentido" titulo2='Variação Linguística'/>

        </View>


        
        </LinearGradient>
    )
}