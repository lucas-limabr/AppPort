import React, { useState } from 'react'
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native'
import Styles from '../Styles.js/StylesCadastro'
import { LinearGradient } from 'expo-linear-gradient'







function cadastrar(nome,email,senha){
        Alert.alert('Cadastro', `${nome}, ${email}, ${senha}`, [
            {
                text: 'ok',

            }
           
        ])
    
}


export default function Cadastro() {
    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const[confimarEmail, setConfirmarEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [confirmarSenha,setConfirmarSenha] = useState('')
    
    return  (
        
                <LinearGradient colors={['#D5D4FB', '#9B98FC']}
                style={Styles.gradient} >
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

                            <Text style={Styles.registrar}>BOTAO RADIO PROFESSOR ALUNO</Text>

                            <TouchableOpacity style={Styles.botao} onPress={() => cadastrar(nome,email,senha)}>
                                <Text style = {Styles.textBotao}>CADASTRAR</Text>
                            </TouchableOpacity>

                    </View>
            </LinearGradient>

    )



}


