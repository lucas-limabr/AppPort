import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import Styles from '../Styles.js/StylesRespostaCorretaAluno'

export default function AcertouQuestao() {

  return (

    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
      style={Styles.gradient} >

      <View style={Styles.container}>

        <View style={Styles.boxTitle}>
          <Text style={Styles.Title}>
            MUITO BEM!
            <Text style={Styles.SubTitle}>
            Certa Resposta
            </Text>
          </Text>
        </View>


        <View style={Styles.box}>

          <View style={Styles.boxImage}>
            <Image style={Styles.ImageFormat} source={require('../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif')} />
          </View>

          <View style={Styles.subDivTag}>
            <View style={Styles.subSubDivTag}>
              <View style={Styles.tagText}>
                <Text style={Styles.FontFormat}>Acertos:</Text>
              </View>
              <View style={Styles.tagText}>
                <Text style={Styles.FontFormat}>Erros:</Text>
              </View>
            </View>
          </View>

          <View style={Styles.buttomBox}>
            <TouchableOpacity style={Styles.buttom}>
              <Text style={[Styles.FontFormatButtom, Styles.shadow]}>Próxima questão</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>

    </LinearGradient>
  );
}