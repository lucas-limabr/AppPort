import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesMenu";
import Descritores from "../Componentes/ComponentDescritores";

export default function Menu(){
    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >

        <View style={Styles.container}>

           <Descritores/>
           <Descritores/>
           <Descritores/>

        </View>


        
        </LinearGradient>
    )
}