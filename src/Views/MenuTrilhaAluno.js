import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Styles from '../Styles.js/StylesMenuTrilha'

export default function MenuTrilha() {

  return (

    <ImageBackground style={Styles.imageAjust} source={require('../Imagens/Trilha_Esborco2_2.png')}>
      <StatusBar style="auto" />

      <View>

        <TouchableOpacity>

          <ImageBackground source={require('../Imagens/Placa4.png')} style={Styles.buttom}>

            <Text style={Styles.textButtom}>

              Interpretação textual

            </Text>

          </ImageBackground>

        </TouchableOpacity>

      </View>


      <View>

        <TouchableOpacity>

          <ImageBackground source={require('../Imagens/Placa4.png')} style={Styles.buttom}>

            <Text style={Styles.textButtom}>

              Morfologia

            </Text>

          </ImageBackground>

        </TouchableOpacity>

      </View>


      <View>

        <TouchableOpacity>

          <ImageBackground source={require('../Imagens/Placa4.png')} style={Styles.buttom}>

            <Text style={Styles.textButtom}>

              Ortografia

            </Text>

          </ImageBackground>

        </TouchableOpacity>

      </View>


      <View>

        <TouchableOpacity>

          <ImageBackground source={require('../Imagens/Placa4.png')} style={Styles.buttom}>

            <Text style={Styles.textButtom}>

              Sintaxe

            </Text>

          </ImageBackground>

        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}
