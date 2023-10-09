import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLista";
import style from "../Styles.js/StylesModalLista"
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
        const [nomeLista, setNomeLista] = useState('')
        return (
            <Modal animationType='slide' transparent={true} visible={visible}>

            <View style={style.container}>
                <View style={style.boxGeral}>
                    <View style={{alignItems: 'center'}}>

                        <Text style={style.titulo}>CRIAR LISTA</Text>

                    </View>
                    
                    
                    <View style={{justifyContent: 'center', height: 185}}> 

                        <Text style={style.label}>Nome da lista:</Text>
                        <TextInput style={style.input} onChangeText={(text) => setNomeLista(text)}></TextInput>
                        
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={style.botao} >
                                    <Text style = {style.txtBotao}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
            </Modal>
        )
    }


    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >
            <ScrollView>

             <ModalLista/>
            
            <View style={Styles.container}>


            <View style={Styles.containerBusca}>

            <TextInput style={Styles.textInput}>
                
            </TextInput>
            </View>

            <View style={Styles.containerList}>
                <TouchableOpacity style={Styles.addLista} onPress={() => setVisible(true)}>
                <AntDesign name="plus" size={50} color="#F54F59" />
                </TouchableOpacity>

              
                

                

            </View>

                {listas.map((titulo, index) => (
                    <Lista key={index} titulo1={titulo} titulo2={`Lista${index + 2}`} />
                ))}
                
            



            </View>
           
            </ScrollView>
        </LinearGradient>
    )

}