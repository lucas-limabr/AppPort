import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesMenu";


const Botao = ({titulo, onPress}) => (
    <TouchableOpacity style={Styles.descritores} onPress={onPress} >
          <Text style={Styles.txtDescritores}>{titulo}</Text>
        </TouchableOpacity>
  )

  const BotaoGrande = ({titulo, onPress}) => (
    <TouchableOpacity style={Styles.descritoresGrande} onPress={onPress} >
          <Text style={Styles.txtDescritores}>{titulo}</Text>
        </TouchableOpacity>
  )  

export default function Menu({navigation}){
    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC']}
        style={Styles.gradient} >

        <View style={Styles.container}>

            <View style={Styles.containerFilho}>
                <Botao titulo="Procedimentos de leitura" onPress={() => {navigation.navigate('DescritoresProcedimentoLeitura')}}/>
                <Botao titulo="Implicações do gênero textual"  onPress={() => {navigation.navigate('DescritorImplicacoesGeneroTextual'); }} />
            </View>
            <View style={Styles.containerFilho}>
                <Botao titulo="Variação Linguística" onPress={() => {navigation.navigate('DescritorVariacaoLinguistica')}}  />
                <Botao titulo="Coerência e Coesão textuais" onPress={() => {navigation.navigate('DescritorCoerenciaCoesaoTextual')}} />
            </View>
            <View style={Styles.containerFilho}>
                <BotaoGrande titulo="Relações entre recursos expressivos e efeitos de sentido" onPress={() => {navigation.navigate('DescritorRelacoesEntreRecursosExpressivos')}} />
                
            </View>

           
        

        </View>


        
        </LinearGradient>
    )
}