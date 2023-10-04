import React, { useContext, useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesPerfil";
import { UserContext } from "../Contexts/auth";

export default function Perfil(){
const {usuarioAtual} = useContext(UserContext)

const [nome, setNome] = useState('');
const [email, setEmail] = useState('');

    useEffect(() => {
        if(usuarioAtual)
        {
            setNome(usuarioAtual.nome);
            setEmail(usuarioAtual.email);
            console.log(nome + email)
    }
    }, [usuarioAtual]);

    return (
        

            <LinearGradient colors={['#D5D4FB', '#9B98FC']}
            style={Styles.gradient} >

            <View style={Styles.container}>



                <View style={Styles.backgroundUser}>

                <Image style={Styles.image}  source={require('../Imagens/defaultUser.png')} />
                </View>


                

                <TouchableOpacity style={[Styles.botao, Styles.sombra]}>
                    <Text style={Styles.txtBotao}>Alterar foto</Text>
                </TouchableOpacity>

                <View style={Styles.containerFilho}>

                <TextInput style={Styles.input}>
                        <Text style={Styles.txtInput}>Nome: {nome}</Text>
                </TextInput>
                </View>
                

                <View style={Styles.containerFilho}>

                <TextInput style={Styles.input}>
                        <Text style={Styles.txtInput}>E-mail: {email}</Text>
                </TextInput>
                </View>
            
                



            </View>

            </LinearGradient>
        
    )
}