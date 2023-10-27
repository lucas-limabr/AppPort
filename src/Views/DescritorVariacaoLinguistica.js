import React, {useEffect} from "react";
import { View, TouchableOpacity, } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Descritores from "../Buttons/Descritores";
import Styles from "../Styles.js/StylesDescritores";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function DescritorVariacaoLinguistica() {
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  });
    
    return(
    <LinearGradient colors={['#D5D4FB', '#9B98FC']}
    style={Styles.gradient} >

    <View style={Styles.container}>
    <View style={Styles.voltar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="caretleft" size={50} color="#F54F59" />
          </TouchableOpacity>
        </View>
        <Descritores titulo='Identificação das marcas linguísticas que evidenciam o locutor e o interlocutor de um texto'  descritor='D10'/>
        
        
    </View>




    </LinearGradient>
    )
}