import React, { useState, useMemo } from 'react'
import {View,  TouchableOpacity, Text, SafeAreaView, Image} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles';
import Listinha from './Listinha';
import RadioGroup from 'react-native-radio-buttons-group';

export default function questoes() {
    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: Listinha[0].questoes[0].opcoes[0],
            value: 'option1' 
        }, 
        {
            id: '2',
            label:  Listinha[0].questoes[0].opcoes[1],
            value: 'option2'
        },
        {
            id: '3',
            label:  Listinha[0].questoes[0].opcoes[2],
            value: 'option3'
        },
        {
            id: '4',
            label:  Listinha[0].questoes[0].opcoes[3],
            value: 'option4'
        }
    ]), [])

    const [selectedId, setSelectedId] = useState()




    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC'] } style={styles.gradient}>
            <View style={styles.container}>
                <View style={styles.enunciado}>
                    <View style={styles.backgroundImagem}>
                    {/* <Image
                    
                    source={{ uri: Listinha[0].questoes[0].imagem}} 
                    /> */}
                    </View>
                    <Text style={styles.txtEnunciado}>{Listinha[0].questoes[0].pergunta}</Text>
                </View>

                <View style={styles.containerResposta}>
                    <Text>TESTE</Text>
                    <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    buttonTextStyle={styles.resposta}
                    color={'#fff'}
                     />
                </View>




            </View>



        </LinearGradient>
    )

}