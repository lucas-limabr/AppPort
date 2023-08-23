import React, { useState, useMemo } from 'react'
import {View,  TouchableOpacity, Text, SafeAreaView, Image} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles';
import Listinha from './Listinha';
import { RadioButton } from 'react-native-paper';


export default function questoes() {
    const [value, setValue] = React.useState('first');

    




    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC'] } style={styles.gradient}>
            <View style={styles.container}>
                <View style={styles.enunciado}>
                    <View style={styles.backgroundImagem}>
                    <Image
                    style={styles.imagem}
                    source={Listinha[0].questoes[0].imagem} 
    />
                    </View>
                    <Text style={styles.txtEnunciado}>{Listinha[0].questoes[0].pergunta}</Text>
                </View>

                <View style={styles.containerResposta}>
                    
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>                       
                    <RadioButton.Item label={Listinha[0].questoes[0].opcoes[0]} 
                    value="first" 
                    style={[styles.alternativas, value === 'first' && styles.selectLabel]}
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>  

                    <RadioButton.Item label={Listinha[0].questoes[0].opcoes[1]} 
                    value="second" 
                    style={[styles.alternativas, value === 'second' && styles.selectLabel]}
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>

                    <RadioButton.Item label={Listinha[0].questoes[0].opcoes[2]} 
                    value="third" 
                    style={[styles.alternativas, value === 'third' && styles.selectLabel]}
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>

                    <RadioButton.Item label={Listinha[0].questoes[0].opcoes[3]}
                    value="fourth"
                    style={[styles.alternativas, value === 'fourth' && styles.selectLabel]} 
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>
                    
                    </RadioButton.Group>
                    
                    
                </View>




            </View>



        </LinearGradient>
    )

}