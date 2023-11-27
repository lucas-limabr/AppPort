import React from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Styles from "../Styles.js/StylesLista";
import { EvilIcons, FontAwesome5  } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {fetchIdList, deleteList} from '../FuncoesFirebase/Funcoes'

export const BotaoLista = ({ titulo, onBotaoPress, onBotaoPressTo }) => {

  const handleBotaoPress = async () => {
    onBotaoPress();
  
    try {
      const id = await fetchId();
      // console.log(id);
      return id;
    } catch (error) {
      // Lide com erros aqui, se necessário
      console.error('Erro ao obter ID:', error);
    }
  };

  const fetchId = async () =>{
    const id = await fetchIdList('nomeLista', 'listas', titulo)

    return id;
  }

  const handleDelete = async () => {
    const codigoListaParaExcluir = await fetchId();
    deleteList(codigoListaParaExcluir);
    onBotaoPressTo();

  }
  
  return(
  
  <TouchableOpacity style={Styles.lista} >
    <View style={Styles.containerBotao}>
      <TouchableOpacity style={{ marginLeft: 5, marginTop: 0}} onPress={handleBotaoPress}>
      <FontAwesome5  name="ellipsis-h" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:'#F54F59'}} onPress={handleDelete}>
      <EvilIcons name="close" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
    <View style={Styles.txt}>
      <Text style={Styles.txtLista}> {titulo} </Text>

    </View>
  </TouchableOpacity>
);}

export default function Lista({ titulo1, onBotaoPress }) {
  
    return (
    <View style = {Styles.containerFilho}>
        <BotaoLista titulo={titulo1} onBotaoPress={onBotaoPress} />
    </View>
    )
  }

  

