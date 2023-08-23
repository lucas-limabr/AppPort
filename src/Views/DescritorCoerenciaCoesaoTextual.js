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
        <Descritores titulo='Estabelecimento de relações entre partes de um texto'/>
        <Descritores titulo='Identificação do confilito gerador do enredo'/>
        <Descritores titulo='estabelecimento  de relação entre partes do texto'/>
        <Descritores titulo='Estabelecimento das relações lógico-discursivas'/>
        
        
    </View>




    </LinearGradient>
    )
}