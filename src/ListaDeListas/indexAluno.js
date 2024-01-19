import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, TouchableOpacity, Text, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Styles from "../Styles.js/StylesDescritores";
import "firebase/firestore";
import { userReference } from "../FuncoesFirebase/Funcoes";
import { useNavigation } from "@react-navigation/native";

import Markdown from "react-native-markdown-display";
import { RadioButton } from "react-native-paper";

import {
  getFirestore,
  collection,
  where,
  doc,
  get,
  query,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function QuestoesAluno() {
  const route = useRoute();
  const codigoLista = route.params.itemId;
  const [questoes, setQuestoes] = useState([]);
  const [indice, setIndice] = useState(0);
  const [questoesCarregadas, setQuestoesCarregadas] = useState(false);
  const [value,setValue] = useState('')
  const [acertos, setAcertos] = useState()
  const [erros, setErros] = useState()
  console.log(indice)
  

  const navigation = useNavigation();

  const questoesCarregadasRef = useRef(questoesCarregadas);

  useEffect(() => {
    questoesCarregadasRef.current = questoesCarregadas;
  }, [questoesCarregadas]);

  const obterQuestoes = useCallback(async () => {
    try {
      setIndice(0);
      const db = getFirestore(FIREBASE_APP);
      const listaCollectionRef = collection(db, "ListaAluno");
      const q = query(listaCollectionRef, where("codigo", "==", codigoLista));
      const querySnapshot = await getDocs(q);
      

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();

        if (data && data.questoes) {
          const referenciasQuestoes = data.questoes;

          const questoesPromises = referenciasQuestoes.map(async (referencia) => {
            const questaoDoc = await getDoc(referencia);
            if (questaoDoc.exists()) {
             return questaoDoc.data();
            } else {
              console.warn("Documento de questão não encontrado:", referencia.id);
              return null;
            }
          });

          const questoesArrayResultado = await Promise.all(questoesPromises);

          // Filtra para remover entradas nulas ou indefinidas
          const questoesFiltradas = questoesArrayResultado.filter((questao) => questao);

          setQuestoes(questoesFiltradas);
          // Utilize o callback de estado para garantir que está atualizado
          setQuestoesCarregadas((prevState) => !prevState);

          const acertos =  0
          const erros =  0

          setAcertos(acertos)
          setErros(erros)

          
        } else {
          console.log("Documento não contém a estrutura esperada.");
        }
      } else {
        console.log("Documento não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao obter as questões:", error);
    }
  }, [codigoLista]);

  

  useEffect(() => {
    
    obterQuestoes();

    const time = 5000;

    const timeoutId = setTimeout(() => {
      
      if (!questoesCarregadasRef.current) {
        
        // Mostra o alerta se as questões não foram carregadas
        Alert.alert(
          "Aviso",
          "A lista está vazia!",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: false }
        );
      }
    }, time);

    return () => clearTimeout(timeoutId); // Limpa o timeout ao desmontar o componente
  }, [obterQuestoes, navigation]);

  function continuar() {
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
    }
    
  }
  
  const proximaQuestao = async (respostaCorreta, respostaALuno) => {
    let novosAcertos = acertos
    let novosErros = erros
    if(respostaCorreta === respostaALuno){
      novosAcertos++
    }else{

      novosErros++
    }

    try{
      const db = getFirestore(FIREBASE_APP);
      const listaCollectionRef = collection(db, "ListaAluno");
      const q = query(listaCollectionRef, where("codigo", "==", codigoLista));
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty){
        const docSnap = querySnapshot.docs[0]
        const listaDocRef = doc(db, "ListaAluno", docSnap.id)

        await updateDoc(listaDocRef, {
          acertos: novosAcertos,
          erros: novosErros,
        })
        setAcertos(novosAcertos)
        setErros(novosErros)
      }
      indice < questoes.length - 1 ?  setIndice(indice + 1) : navigation.goBack({reload: true})   
    }catch(error){
      console.error(error)
    }

  }

  

  const questaoAtual = questoes[indice];

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      {questaoAtual ? (
        <View style={styles.container}>
          
          <View style={styles.enunciado}>
            <View style={styles.backgroundImagem}>
              <Image
                style={styles.imagem}
                source={{ uri: questaoAtual.urlImagem }}
                resizeMode="contain"
              />
            </View>
            <Markdown style={{
              body: {
                fontSize: 16,
                color: "#fff",
                top: 0,
                width: "90%",
                left: 5,
                padding: 5,
                textAlign: "left",
                fontFamily: "Inder_400Regular",
              },
            }}>{questaoAtual.pergunta}</Markdown>
          </View>

          <View style={styles.containerResposta}>
            <ScrollView style={styles.scroll}>

          <RadioButton.Group
  onValueChange={(value) => {setValue(value)}}
  value={value}
>
  {questaoAtual.respostas.map((resposta, index) => (
    <RadioButton.Item
      key={index}
      label={resposta}
      value={resposta}
      style={[
        styles.alternativas,
        value === resposta && styles.selectLabel,
      ]}
      labelStyle={styles.label}
      uncheckedColor="#fff"
      color="#fff"
    />
  ))}
</RadioButton.Group>
            </ScrollView>
          </View>

          <View style={styles.containerContinuar}>
            
              
            
              
            
            <TouchableOpacity style={styles.confirmar} onPress={() => proximaQuestao(questaoAtual.respostaCorreta, value)}>
              <Text style={styles.label}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              flex: 1,
              width: "100%",
              height: undefined,
              aspectRatio: 1,
            }}
            source={require("../Imagens/Nuvem_3(uPDATE).gif")}
            resizeMode="contain"
          />
        </View>
      )}
    </LinearGradient>
  );
}
