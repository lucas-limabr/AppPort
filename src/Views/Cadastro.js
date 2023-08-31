import React, { useState } from 'react'
import {View, TextInput, TouchableOpacity, Text, Alert, ScrollView} from 'react-native'
import Styles from '../Styles.js/StylesCadastro'
import { LinearGradient } from 'expo-linear-gradient'
import { Switch } from 'react-native-gesture-handler'
import Custom from './TermosDeUso'
import { FIREBASE_APP, FIREBASE_AUTH } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

export default function Cadastro({navigation}) {
    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const[confimarEmail, setConfirmarEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [confirmarSenha,setConfirmarSenha] = useState('')
    const [souProfessor, setSouProfessor] = useState(false);
    const [urlImagemPerfil, setImagemPerfil] = useState('')

    const [visible, setVisible] = useState(false)
    const auth = FIREBASE_AUTH
    const db = getFirestore(FIREBASE_APP)
    const userCollectionRef = collection(db, 'users')   
    
    const toggleSwitch = () => setSouProfessor(previousState => !previousState);
    
    
    const signUp = async (auth,email, senha) => {
        try{
            const resposta = await createUserWithEmailAndPassword(auth, email, senha)
            Alert.alert('Usuário Cadastrado')
            cadastroBD(nome, email, souProfessor)

        } catch(error){
        Alert.alert('erro' + error.message)
        }
    }

    async function cadastroBD() {
        const user = await addDoc(userCollectionRef, {
            nome,
            email,
            souProfessor,
            urlImagemPerfil
        })
    }

    function cadastrar(){
        if(email != confimarEmail || email == '' || senha != confirmarSenha || senha == '' || nome == ''){
            Alert.alert('Dados incorretos')
        } else{
            // setVisible(true)
            signUp(auth, email, senha)
            // navigation.navigate('Menu')
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
                                    thumbColor={souProfessor ? '#ffb9bd' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={souProfessor} 
                                    />

                            <Text style={Styles.txtProfessor}>SOU PROFESSOR</Text>

                            

                        </View>
                        </View>

                       

                            <TouchableOpacity style={Styles.botao} onPress={cadastrar}>
                                <Text style = {Styles.textBotao}>CADASTRAR</Text>
                            </TouchableOpacity>
                            <Custom visible={visible}/>
                    </View>
                    </ScrollView>
            </LinearGradient>

    )



}


