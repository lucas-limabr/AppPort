import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLista";
import Lista from "../Componentes/ComponentLista";



export default function Listas() {
    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >
            <View style={Styles.container}>


            <View style={Styles.containerBusca}>

            <TextInput style={Styles.textInput}>
                
            </TextInput>
            </View>

            <View style={Styles.containerList}>
                <TouchableOpacity style={Styles.addLista}>
                    <Text style={Styles.txtAdd}> + </Text>
                </TouchableOpacity>

                <Lista/>

            </View>


            </View>
        </LinearGradient>
    )

}