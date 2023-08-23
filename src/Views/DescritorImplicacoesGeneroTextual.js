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
        <Descritores titulo='Interpretação de textos'/>
        <Descritores titulo='Reconhecimento do gênero discursivo'/>
        <Descritores titulo='Identifcacção da finalidade textual'/>
        
        
    </View>




    </LinearGradient>
    )
}