import React, { useState, useMemo } from 'react'
import {View, TextInput, TouchableOpacity, Text, Alert, ScrollView} from 'react-native'
import Styles from '../Styles.js/StylesCadastro'
import { LinearGradient } from 'expo-linear-gradient'
import RadioGroup from 'react-native-radio-buttons-group';







function cadastrar(nome,email,senha, navigation){
        Alert.alert('Cadastro', `${nome}, ${email}, ${senha}`, [
            {
                text: 'ok',

            }
            
           
        ])
        navigation.navigate('Tab')
    
}


export default function Cadastro({navigation}) {
    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const[confimarEmail, setConfirmarEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [confirmarSenha,setConfirmarSenha] = useState('')

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Professor',
            value: 'professor' 
        }, 
        {
            id: '2',
            label: 'Aluno',
            value: 'aluno'
        },
        
       
    ]), [])

    const [selectedId, setSelectedId] = useState()
    
    return  (
        
                <LinearGradient colors={['#D5D4FB', '#9B98FC']}
                style={Styles.gradient} >
                    <ScrollView>

                   
                    <View style={Styles.container}>
                    
                        <View style={Styles.containerFilho}>

                            <Text style ={Styles.descricao} >Nome:</Text>

                            <TextInput style = {Styles.input}
                            onChangeText={(text) =>setNome(text)}/>

                        </View>

                        <View style={Styles.containerFilho}>

                            <Text style ={Styles.descricao}>E-mail:</Text>

                            <TextInput style = {Styles.input} 
                            onChangeText={(text) =>setEmail(text)}/>

                        </View>

                        <View style={Styles.containerFilho}>

                            <Text style ={Styles.descricaoGrande}>Confirmação do e-mail:</Text>

                            <TextInput style = {Styles.input} 
                            onChangeText={(text) =>setConfirmarEmail(text)}/>

                        </View>


                        <View style={Styles.containerFilho}>

                            <Text style ={Styles.descricao}>Senha:</Text>

                            <TextInput style = {Styles.input} 
                            onChangeText={(text) =>setConfirmarSenha(text)}
                            secureTextEntry={true}/>

                        </View>
                        <View style={Styles.containerFilho}>

                            <Text style ={Styles.descricaoGrande}>Confirmação da senha:</Text>

                            <TextInput style = {Styles.input} 
                            onChangeText={(text) =>setSenha(text)}
                            secureTextEntry={true}/>

                        </View>

                        <RadioGroup radioButtons={radioButtons} onPress={setSelectedId} selectedId={selectedId} layout='row'
                         />

                            <TouchableOpacity style={Styles.botao} onPress={() => cadastrar(nome,email,senha, navigation)}>
                                <Text style = {Styles.textBotao}>CADASTRAR</Text>
                            </TouchableOpacity>

                    </View>
                    </ScrollView>
            </LinearGradient>

    )



}


