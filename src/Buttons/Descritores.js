import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styles from "../Styles.js/StylesDescritores";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Descritor = ({titulo, questaoDescritor}) => {

    const navigation = useNavigation()
    

return(
    <TouchableOpacity style={Styles.botao} onPress={() => {navigation.navigate('Questoes', {questaoDescritor})}}>
        <Text style={Styles.txtDescritor}>{titulo}</Text>
        <AntDesign name="caretright" size={40} color="#fff" />
    </TouchableOpacity>
)
}

export default function Descritores({titulo, descritor}) {
    return(
    <View>
        <Descritor titulo={titulo} questaoDescritor={descritor}/>
    </View>
    )
}