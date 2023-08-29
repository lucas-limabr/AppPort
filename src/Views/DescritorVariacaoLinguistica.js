import React from "react";
import { View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";

export default function DescritorVariacaoLinguistica() {
    
    return(
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
    style={Styles.gradient} >

    <View style={Styles.container}>
        <Descritores titulo='Identificação das marcas linguísticas que evidenciam o locutor e o interlocutor de um texto'/>
        
        
    </View>




    </LinearGradient>
    )
}