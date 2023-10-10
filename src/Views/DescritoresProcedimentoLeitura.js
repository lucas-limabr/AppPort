import React, { useEffect } from "react";
import {View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";

export default function DescritoresProcedimentoLeitura() {

    const navigation = useNavigation();

    useEffect(() =>{
        navigation.setOptions({tabBarVisible: false})
    })
    
    return(
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
    style={Styles.gradient} >

    <View style={Styles.container}>
        <Descritores titulo='Localização de informações explícitas' descritor='D1'/>
        <Descritores titulo='Inferência de sentido' descritor='D3'/>
        <Descritores titulo='Inferência de informação implícita' descritor='D4'/>
        <Descritores titulo='Identificação do tema do texto' descritor='D6'/>
        <Descritores titulo='Distinção entre fato e opinião' descritor='D11'/>
        
    </View>




    </LinearGradient>
    )
}