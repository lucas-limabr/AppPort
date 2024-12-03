import React from "react";
import { View, Text, TouchableOpacity } from 'react-native' // aqui ta o import das tags
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient"; // essa biblioteca tem q ser baixada para poder fazer o efeito do degradê que fica ao fundo do app
import Styles from "../Styles.js/StylesLogin"; // isso aqui importa o arquivo de estilos, como se fosse o css, ele é usado dentro da propriedade style de cada tag, voce pode colocar o nome que quiser, eu uso por padrao o Styles.

export default function Login({ navigation }) {
    return (

        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
            style={Styles.gradient} >

            <View style={Styles.container}>

                <Image style={Styles.imageNome} source={require('../Imagens/NomePortuguito.png')} />

                <View style={Styles.containerFilho}>
                    <View style={Styles.botaoContainer}>
                        <TouchableOpacity style={Styles.botaoGrande} onPress={() => { navigation.navigate('Home') }}>
                            <Text style={Styles.textBotao}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.containerFilho}>
                        <TouchableOpacity style={Styles.botaoPequeno} onPress={() => {
                            navigation.navigate('Cadastro')
                        }}>
                            <Text style={Styles.textBotaoPequeno}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={Styles.frase}>Aprender pode ser divertido</Text>

            </View>


            <Image style={Styles.imageLogo} source={require('../Imagens/Levri8Cortado.gif')} />


        </LinearGradient>
    )
}
