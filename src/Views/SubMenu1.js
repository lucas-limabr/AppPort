import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Styles from '../Styles.js/StylesSubMenu1'
import { useNavigation } from "@react-navigation/native";

export default function SubMenu1() {
  const navigation = useNavigation()
  


  return (

    <ImageBackground style={Styles.imageAjust} source={require('../Imagens/Trilha1.png')}>
      <StatusBar style="auto" />

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'crase'})}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Crase
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity  onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'pontuacao'})}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Pontuação
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'regencia'})}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Regência
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity  onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'figurasDeLinguagem'})}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Figuras de linguagem
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

      </View>

      <View style={Styles.divTela}>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'concordancia'})}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Concordância
              </Text>

            </ImageBackground>

          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity onPress={() => navigation.navigate('Trilha', { screen: 'Trilha', params: 'vozesVerbais'})}>

            <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

              <Text style={Styles.textButtom}>
                Vozes verbais
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
