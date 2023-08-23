import React from "react";
import {View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";

export default function DescritoresView() {
    
    return(
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
    style={Styles.gradient} >

    <View style={Styles.container}>
        <Descritores titulo='Identificação dos efeitos de ironia ou humor em textos variados'/>
        <Descritores titulo='identificação do efeito de sentido decorrente do uso da pontuação'/>
        
        
    </View>




    </LinearGradient>
    )
}