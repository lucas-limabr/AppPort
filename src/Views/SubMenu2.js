import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Styles from '../Styles.js/StylesSubMenu2'
import { useNavigation } from "@react-navigation/native";

export default function SubMenu2() {

  const navigation = useNavigation()

  return (

    <ImageBackground style={Styles.imageAjust} source={require('../Imagens/Trilha2.png')}>
      <StatusBar style="auto" />

      <View style={Styles.divTela}> 

        <View>

          <TouchableOpacity>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Classes gramaticais
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Pronomes
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Preposições
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Conjunções
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Flexões verbais
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity onPress={() => navigation.goBack()}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Voltar
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>


    </ImageBackground>
  );
}
