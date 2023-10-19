import React, { useState } from 'react'
import {View, TextInput, TouchableOpacity, Text, Alert, ScrollView, Modal} from 'react-native'
import Styles from '../Styles.js/StylesCadastro'
import { LinearGradient } from 'expo-linear-gradient'
import { Switch } from 'react-native-gesture-handler'
import { FIREBASE_APP, FIREBASE_AUTH } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import styles from '../Styles.js/StylesTermoDeUso'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Cadastro({navigation}) {
    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const [confimarEmail, setConfirmarEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [confirmarSenha,setConfirmarSenha] = useState('')
    const [souProfessor, setSouProfessor] = useState(false);
    const [urlImagemPerfil, setImagemPerfil] = useState('')
    
    const [visible, setVisible] = useState(false)
    const auth = FIREBASE_AUTH
    const db = getFirestore(FIREBASE_APP)
    const userCollectionRef = collection(db, 'users') 
    
    
    
    const aceitoProfessor = () => setSouProfessor(previousState => !previousState);
    
    
    
    function CustomModal() {
        
        const [aceitoTermo, setAceitoTermo] = useState(false)
        const switchTermo = () => setAceitoTermo(previousState => !previousState);

        return(
            <Modal animationType='slide' transparent={true} visible={visible}>
                <View style={styles.container}>
                    
    
                        <View style={styles.center}>
    
                            <View style={styles.telaDoTermo}>
                            <ScrollView>
                                <Text style={styles.termoDeUso}>What is Lorem Ipsum?
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    
                                        Why do we use it?
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                        </Text>
                            </ScrollView>
                            </View>
                        </View>
    
                        <View style={styles.switch}>
    
                            <Switch trackColor={{false: '#767577', true: '#FF8D94'}}
                                    thumbColor={aceitoTermo ? '#FF8D94' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={switchTermo}
                                    value={aceitoTermo} 
                                    />
                            <Text style={styles.textoSwitch}>Li e aceito os termos</Text>
                        </View>
                        <View style={styles.containerBotao}>
    
                        <TouchableOpacity style={[styles.botao, !aceitoTermo && {backgroundColor: "#767577"}]} disabled={!aceitoTermo} onPress={signUp}>
                            <Text style={styles.textoBotao}>Continuar</Text>
                        </TouchableOpacity>
                        </View>
                    
                </View>
            </Modal>
        )

    }
    
    
    const signUp = async () => {
        
            try{
                const resposta = await createUserWithEmailAndPassword(auth, email, senha)
                cadastroBD()
    
            } catch(error){
            Alert.alert('erro' + error.message)
            console.log(error)
            setVisible(false)
            
            }

        
    }

    const localStorage = async (nome, email, urlImagemPerfil) => {
        const usuarioAssincrono = {
            nome: nome,
            email: email,
            urlImagemPerfil: urlImagemPerfil
        }
        const usuarioString = JSON.stringify(usuarioAssincrono)
        
        await AsyncStorage.setItem('@portuguito2023', usuarioString)

        

        const teste = await AsyncStorage.getItem('@portuguito2023')
        console.log(usuarioString === teste)
    }

    async function cadastroBD() {
        const user = await addDoc(userCollectionRef, {
            nome,
            email,
            souProfessor,
            urlImagemPerfil
        })
        localStorage(nome,email,urlImagemPerfil)
    }

    function cadastrar(){
        if(email != confimarEmail || email == '' || senha != confirmarSenha || senha == '' || nome == ''){
            Alert.alert('Dados incorretos')
        } else{
            setVisible(true)
            
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
                                    onValueChange={aceitoProfessor}
                                    value={souProfessor} 
                                    />

                            <Text style={Styles.txtProfessor}>SOU PROFESSOR</Text>

                            

                        </View>
                        </View>

                       

                            <TouchableOpacity style={Styles.botao} onPress={cadastrar}>
                                <Text style = {Styles.textBotao}>CADASTRAR</Text>
                            </TouchableOpacity>
                            <CustomModal/>
                    </View>
                    </ScrollView>
            </LinearGradient>

    )



}


