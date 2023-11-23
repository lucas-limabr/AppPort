import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import "firebase/firestore";

export default function Questoes() {
  const [value, setValue] =useState("first");
  const [pergunta, setPergunta] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [id, setId] = useState(null);
  const [resposta, setResposta] = useState([]);
  const [urlImagem, setUrlImagem] = useState(null);
  const [indice, setIndice] = useState(0);
  const [atualizarDados, setAtualizarDados] = useState(false);
  const route = useRoute();
  const [questaoEstaNaLista, setQuestaoEstaNaLista] = useState(false)

  const navigation = useNavigation();

  const idLista = route.params.idLista;

  const db = getFirestore(FIREBASE_APP);

  const collectionRef = collection(db, "questoes");

  const descritor = "descritor";

  const valorDescritor = route.params.questaoDescritor;

  const q = query(collectionRef, where(descritor, "==", valorDescritor));

  async function fetchData() {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDocument = querySnapshot.docs[indice];
      const data = firstDocument.data();
      const questaoId = firstDocument.id;
      

      return {
        id: questaoId,
        pergunta: data.pergunta,
        respostaCorreta: data.respostaCorreta,
        respostas: data.respostas,
        urlImagem: data.urlImagem,
      };
    }
    return null;
  }

  const selecionarQuestao = async (questaoId) => {
    const listaRef = doc(db, "listas", idLista);

    // Obtém os dados atuais da lista
    const listaDoc = await getDoc(listaRef);
    const listaData = listaDoc.data();
    
    // Verifica se a questão já está na lista
    const questaoRef = doc(db, "questoes", questaoId);
    
    try {
      const questaoDoc = await getDoc(questaoRef);
    
      if (questaoDoc.exists()) {
        const questaoIndex = listaData.questoes.findIndex((ref) => ref.path === questaoRef.path);
    
        if (questaoIndex !== -1) {
          // Se a questão já está na lista, remove ela
          const novaLista = [...listaData.questoes];
          novaLista.splice(questaoIndex, 1);
    
          // Atualiza a lista no Firestore
          await updateDoc(listaRef, { questoes: novaLista });
        } else {
          // Se a questão não está na lista, adiciona ela
          const novaLista = [...listaData.questoes, questaoRef];
    
          // Atualiza a lista no Firestore
          await updateDoc(listaRef, { questoes: novaLista });
        }
        const estaNaLista = await verificarArray(questaoId);
            setQuestaoEstaNaLista(estaNaLista);
      } else {
        console.error("O documento da questão não existe no Firestore");
      }
    } catch (error) {
      console.error("Erro ao obter documento da questão:", error);
    }
  };

  const verificarArray = async (id) => {
    try {
      // Crie referências para a lista e a questão
      const listaRef = doc(db, "listas", idLista);
      const questaoRef = doc(db, "questoes", id);
      
  
      // Obtenha os dados atuais da lista
      const listaDoc = await getDoc(listaRef);
  
      if (listaDoc.exists()) {
        const listaData = listaDoc.data();
  
        // Verifique se a questão está na lista
        const questaoEstaNaLista = listaData?.questoes?.some(questao => questao?.path === questaoRef.path && questaoRef.path !== null);


        console.log(questaoEstaNaLista)
  
        return questaoEstaNaLista;
      } 
    } catch (error) {
      console.error("Erro ao verificar a lista de questões:", error);
      return false;
    }
    
    
  };
  


  function continuar() {
    setIndice(indice + 1);
    setAtualizarDados(!atualizarDados);
  }

  function voltar() {
    if (indice != 0) {
      setIndice(indice - 1);
      setAtualizarDados(!atualizarDados);
    }
  }

  useEffect(() => {
    fetchData().then((result) => {
      setPergunta(result.pergunta);
      setRespostaCorreta(result.respostaCorreta);
      setResposta(result.respostas);
      setUrlImagem(result.urlImagem);
      setId(result.id);
      
    })
    const verirficarEAtualizarEstado = async () =>{
      const estaNaLista = await verificarArray(id)
      setQuestaoEstaNaLista(estaNaLista)
    };
    verirficarEAtualizarEstado()
  }, [atualizarDados]);

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      <View style={Styles.voltar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="caretleft" size={50} color="#F54F59" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.containerSalvar}>
          <TouchableOpacity
            style={styles.btnSalvar}
            onPress={() => selecionarQuestao(id)}
          >
            <Text style={styles.label}>
              {questaoEstaNaLista ? "Excluir" : "Incluir"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.enunciado}>
          <View style={styles.backgroundImagem}>
            <Image
              style={styles.imagem}
              source={{ uri: urlImagem }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.txtEnunciado}>{pergunta}</Text>
        </View>

        <View style={styles.containerResposta}>
          <ScrollView style={styles.scroll}>
            <TouchableOpacity
              style={[
                resposta[0] === respostaCorreta
                  ? [styles.alternativas, styles.selectLabel]
                  : styles.alternativas,
              ]}
            >
              <Text style={styles.txtEnunciado}>{resposta[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                resposta[1] === respostaCorreta
                  ? [styles.alternativas, styles.selectLabel]
                  : styles.alternativas,
              ]}
            >
              <Text style={styles.txtEnunciado}>{resposta[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                resposta[2] === respostaCorreta
                  ? [styles.alternativas, styles.selectLabel]
                  : styles.alternativas,
              ]}
            >
              <Text style={styles.txtEnunciado}>{resposta[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                resposta[3] === respostaCorreta
                  ? [styles.alternativas, styles.selectLabel]
                  : styles.alternativas,
              ]}
            >
              <Text style={styles.txtEnunciado}>{resposta[3]}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.containerContinuar}>
          {indice > 0 ? (
            <TouchableOpacity style={styles.btnContinuar} onPress={voltar}>
              <Text style={styles.label}>Voltar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.btnContinuar, { backgroundColor: "#767577" }]}
              disabled={true}
              onPress={voltar}
            >
              <Text style={styles.label}>Voltar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.btnContinuar} onPress={continuar}>
            <Text style={styles.label}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
