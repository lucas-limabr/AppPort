import React, { useState } from 'react'
import {View, TextInput, TouchableOpacity, Text, Alert, ScrollView} from 'react-native'
import Styles from '../Styles.js/StylesCadastro'
import { LinearGradient } from 'expo-linear-gradient'
import { Switch } from 'react-native-gesture-handler'
import Custom from './TermosDeUso'

export default function Cadastro({navigation}) {
    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const[confimarEmail, setConfirmarEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [confirmarSenha,setConfirmarSenha] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false)    
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    
    
    function cadastrar(){
        if(email != confimarEmail || email == '' || senha != confirmarSenha || senha == '' || nome == ''){
            Alert.alert('Dados incorretos')
        } else{
            // setVisible(true)
            Alert.alert('tudo certo!!!!!')
            // navigation.navigate('Tab')
        }
        
    }
    
    
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

                        <View style={Styles.containerFilho}>

                        <View style={Styles.containerProfessor}>
                            <Switch trackColor={{false: '#767577', true: '#ffb9bd'}}
                                    thumbColor={isEnabled ? '#ffb9bd' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled} 
                                    />

                            <Text style={Styles.txtProfessor}>SOU PROFESSOR</Text>

                            

                        </View>
                        </View>

                       

                            <TouchableOpacity style={Styles.botao} onPress={() => setVisible(true)}>
                                <Text style = {Styles.textBotao}>CADASTRAR</Text>
                            </TouchableOpacity>
                            <Custom visible={visible}/>
                    </View>
                    </ScrollView>
            </LinearGradient>

    )



}


