import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styles from "../Styles.js/StylesDescritores";
import { AntDesign } from '@expo/vector-icons';

const Descritor = ({titulo}) => (
    <TouchableOpacity style={Styles.botao}>
        <Text style={Styles.txtDescritor}>{titulo}</Text>
        <AntDesign name="caretright" size={40} color="#fff" />
    </TouchableOpacity>
)

export default function Descritores({titulo}) {
    return(
    <View>
        <Descritor titulo={titulo}/>
    </View>
    )
}