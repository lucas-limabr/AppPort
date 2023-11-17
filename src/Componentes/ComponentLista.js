import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../Styles.js/StylesLista";
import { EvilIcons, FontAwesome5  } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {fetchIdList} from '../FuncoesFirebase/Funcoes'

export const BotaoLista = ({ titulo }) => {
  const navigation = useNavigation()
  
  return(
  
  <TouchableOpacity style={Styles.lista} onPress={() => fetchIdList('nomeLista', 'listas', titulo)}>
    <View style={Styles.containerBotao}>
      <TouchableOpacity style={{ marginLeft: 5, marginTop: 0}}>
      <FontAwesome5  name="ellipsis-h" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:'#F54F59'}}>
      <EvilIcons name="close" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
    <View style={Styles.txt}>
      <Text style={Styles.txtLista}> {titulo} </Text>

    </View>
  </TouchableOpacity>
);}

export default function Lista({ titulo1 }) {
  
    return (
    <View style = {Styles.containerFilho}>
        <BotaoLista titulo={titulo1} />
    </View>
    )
  }

  

