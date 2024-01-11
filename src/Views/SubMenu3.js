import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Styles from '../Styles.js/StylesSubMenu3'

export default function SubMenu3() {

  return (

    <ImageBackground style={Styles.imageAjust} source={require('../Imagens/Trilha4.png')}>
      <StatusBar style="auto" />

        <View style={Styles.divTela}>

          <View>

            <TouchableOpacity>

              <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

                <Text style={Styles.textButtom}>
                  Sílabas
                </Text>

              </ImageBackground>

            </TouchableOpacity>

          </View>

          <View>

            <TouchableOpacity>

              <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

                <Text style={Styles.textButtom}>
                  Uso de expressões cotidianas
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
                  Acentuação
                </Text>

              </ImageBackground>

            </TouchableOpacity>

          </View>

          <View>

            <TouchableOpacity>

              <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.buttom}>

                <Text style={Styles.textButtom}>
                  Uso dos porques
                </Text>

              </ImageBackground>

            </TouchableOpacity>

          </View>

        </View>

        <View style={Styles.divTela}>

          <View>

            <TouchableOpacity>

              <ImageBackground source={require('../Imagens/Placa5.png')} style={Styles.voltar}>

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
