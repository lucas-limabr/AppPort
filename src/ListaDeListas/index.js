import React, { useState, useEffect } from 'react'
import {View,  TouchableOpacity, Text, Image} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles';
import { RadioButton } from 'react-native-paper';
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { useRoute } from '@react-navigation/native';    



export default function Questoes() {
    const [value, setValue] = React.useState('first');
    const [pergunta, setPergunta] = useState(null)
    const [respostaCorreta, setRespostaCorreta] = useState(null)
    const [resposta, setResposta] = useState([])
    const [urlImagem, setUrlImagem] = useState(null)
    const [indice, setIndice] = useState(0)
    const [atualizarDados, setAtualizarDados] = useState(false)
    const route = useRoute()   
    
    const [questaoSelecionadas, setQuestaoSelecionadas] = useState([])

    
    const db = getFirestore(FIREBASE_APP)  

    const collectionRef = collection(db, 'questoes')

    const descritor = 'descritor'

    const valorDescritor = route.params.questaoDescritor

    const q = query(collectionRef, where(descritor, '==', valorDescritor))

    async function fetchData() {
        const querySnapshot = await getDocs(q)

        if(!querySnapshot.empty){
            const firstDocument = querySnapshot.docs[indice]
            const data = firstDocument.data()

            console.log(indice)
            

            return {
                pergunta: data.pergunta,
                respostaCorreta: data.respostaCorreta,
                respostas: data.respostas,
                urlImagem: data.urlImagem, 
                

            }
        }
        return null;

       
    }

    const selecionarQuestao = () => {
        
        const questaoAtual ={
            pergunta: pergunta,
            respostaCorreta: respostaCorreta,
            respostas: resposta,
            urlImagem: urlImagem,
            
        }

        

        setQuestaoSelecionadas([...questaoSelecionadas, questaoAtual])
        
        console.log(questaoSelecionadas)
        
    }

    function continuar() {
        setIndice(indice + 1)
        setAtualizarDados(!atualizarDados)
    }

    function voltar() {
        if(indice != 0){

            setIndice(indice - 1)
            setAtualizarDados(!atualizarDados)
        }
    }

    
    
    useEffect(()=> {
        fetchData().then((result) => {
            setPergunta(result.pergunta)
            setRespostaCorreta(result.respostaCorreta)
            setResposta(result.respostas)
            setUrlImagem(result.urlImagem)
            
        })
    }, [atualizarDados])
    
    

    return (
        <LinearGradient colors={['#D5D4FB', '#9B98FC'] } style={styles.gradient}>
            <View style={styles.container}>
                <View style={styles.enunciado}>
                    <View style={styles.backgroundImagem}>
                        <Image
                        style={styles.imagem}
                        source={{uri: urlImagem}} 
                        resizeMode='contain'/>
                    </View>
                    <Text style={styles.txtEnunciado}>{pergunta}</Text>
                </View>

                <View style={styles.containerResposta}>
                    
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>                       
                    <RadioButton.Item label={resposta[0]} 
                    value="first" 
                    style={[styles.alternativas, value === 'first' && styles.selectLabel]}
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>  

                    <RadioButton.Item label={resposta[1]} 
                    value="second" 
                    style={[styles.alternativas, value === 'second' && styles.selectLabel]}
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>

                    <RadioButton.Item label={resposta[2]} 
                    value="third" 
                    style={[styles.alternativas, value === 'third' && styles.selectLabel]}
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>

                    <RadioButton.Item label={resposta[3]}
                    value="fourth"
                    style={[styles.alternativas, value === 'fourth' && styles.selectLabel]} 
                    labelStyle={styles.label}
                    uncheckedColor='#fff'
                    color='#fff'/>
                    
                    </RadioButton.Group>
                    
                    
                </View>

                <View style={styles.containerContinuar}>
                    <TouchableOpacity style={styles.btnContinuar} onPress={voltar}>
                        <Text style={styles.label}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnContinuar} onPress={() => selecionarQuestao()}>
                        <Text style={styles.label}>Selecionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnContinuar} onPress={continuar}>
                        <Text style={styles.label}>Continuar</Text>
                    </TouchableOpacity>
                </View>




            </View>



        </LinearGradient>
    )

}