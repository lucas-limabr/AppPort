import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLista";
import Lista from "../Componentes/ComponentLista";
import { AntDesign } from '@expo/vector-icons';



export default function Listas() {
    const [listas, setListas] = useState([])
    const [visible, setVisible] = useState(false)

    function criarLista() {


        const newLista = `Lista${listas.length + 1}`
        setListas([...listas, newLista])
        
    }

    function ModalLista() {
        return (
            <Modal animationType='slide' transparent={true} visible={true}>

            <View style={{backgroundColor:'#000'}}>

            </View>
            </Modal>
        )
    }


    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >
            <ScrollView>


            
            <View style={Styles.container}>


            <View style={Styles.containerBusca}>

            <TextInput style={Styles.textInput}>
                
            </TextInput>
            </View>

            <View style={Styles.containerList}>
                <TouchableOpacity style={Styles.addLista} onPress={() => criarLista()}>
                <AntDesign name="plus" size={50} color="#F54F59" />
                </TouchableOpacity>

              
                

                

            </View>

                {listas.map((titulo, index) => (
                    <Lista key={index} titulo1={titulo} titulo2={`Lista${index + 2}`} />
                ))}
                
            



            </View>
           {/*  <ModalLista/> */}
            </ScrollView>
        </LinearGradient>
    )

}