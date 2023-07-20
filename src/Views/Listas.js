import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLista";
import Lista from "../Componentes/ComponentLista";
import { BotaoLista } from "../Componentes/ComponentLista";
import { AntDesign } from '@expo/vector-icons';







export default function Listas() {
    const [listas, setListas] = useState([])

    function criarLista() {
        const newLista = `Lista${listas.length + 1}`
        setListas([...listas, newLista])
    }


    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >
            <View style={Styles.container}>


            <View style={Styles.containerBusca}>

            <TextInput style={Styles.textInput}>
                
            </TextInput>
            </View>

            <View style={Styles.containerList}>
                <TouchableOpacity style={Styles.addLista} onPress={() => criarLista()}>
                <AntDesign name="plus" size={50} color="#F54F59" />
                </TouchableOpacity>

                <BotaoLista titulo='Lista1'/>
                

                

            </View>

                {listas.map((titulo, index) => (
                    <Lista key={index} titulo1={titulo} titulo2={`Lista${index + 2}`} />
                ))}
                
            



            </View>
        </LinearGradient>
    )

}