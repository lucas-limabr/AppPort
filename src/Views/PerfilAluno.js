import React from "react";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import Styles from '../Styles.js/StylesPerfilAluno'

export default function PerfilAluno() {

        return (

                <LinearGradient colors={['#D5D4FB', '#9B98FC']}
                        style={Styles.gradient} >

                        <View style={Styles.container}>

                                <View style={Styles.backgroundUser}>

                                        <Image style={Styles.image} source={require('../Imagens/defaultUser.png')} />
                                </View>

                                <TouchableOpacity style={[Styles.botao, Styles.sombra]}>
                                        <Text style={Styles.txtBotao}>Alterar foto</Text>
                                </TouchableOpacity>

                                <View style={Styles.containerFilho}>

                                        <TextInput style={Styles.input}>
                                                <Text style={Styles.txtInput}>Nome:</Text>
                                        </TextInput>
                                </View>

                                <View style={Styles.containerFilho}>

                                        <View style={Styles.containerSonAux}>

                                                <View style={Styles.containerSonAuxFlexbox}>

                                                        <View style={Styles.ViewDados}>
                                                                <View style={Styles.titleView}>
                                                                <Text style={Styles.txtTitleView}>Sequência</Text>
                                                                </View>
                                                                
                                                                <View style={Styles.numberDays}>                                                                       
                                                                <Text style={Styles.txtnumberDays}>X</Text>
                                                                </View>

                                                                
                                                                <View style={Styles.titleView}>
                                                                <Text style={Styles.txtTitleView}>Dias</Text>
                                                                </View>
                                                        </View>

                                                        <View style={Styles.ViewDados}>
                                                                <View style={Styles.titleView}>
                                                                <Text style={Styles.txtTitleView}>Desde</Text>
                                                                </View>
                                                                
                                                                <View style={Styles.numberDays}>                                                                       
                                                                <Text style={Styles.txtDate}>XX:XX:XXXX</Text>
                                                                </View>

                                                        </View>
                                                </View>
                                        </View>

                                </View>

                                <View style={Styles.containerFilho}>

                                        <TextInput style={Styles.viewOptions}>
                                                <Text style={Styles.txtInput}>E-mail:</Text>
                                        </TextInput>
                                </View>





                        </View>

                </LinearGradient>
        );
}