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
} from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";



// import {adicionarQuestao} from "../Views/Listas"

export default function Questoes() {
  const [value, setValue] = React.useState("first");
  const [pergunta, setPergunta] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [id, setId] = useState(null)
  const [resposta, setResposta] = useState([]);
  const [urlImagem, setUrlImagem] = useState(null);
  const [indice, setIndice] = useState(0);
  const [atualizarDados, setAtualizarDados] = useState(false);
  const route = useRoute();

  const navigation = useNavigation()

  const [questaoSelecionadas, setQuestaoSelecionadas] = useState([]);

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

  const selecionarQuestao = (questaoId) => {
    setQuestaoSelecionadas((prevQuestao) => {
      const questaoIndex = prevQuestao.indexOf(questaoId);
  
      if (questaoIndex !== -1) {
        // Se a questão já está no array, remove ela
        const novoArray = [...prevQuestao];
        novoArray.splice(questaoIndex, 1);
        console.log(novoArray);
        return novoArray;
      } else {
        // Se a questão não está no array, adiciona ela
        const novoArray = [...prevQuestao, questaoId];
        console.log(novoArray);
        return novoArray;
      }
    });
  };
    const verificarArray = () => {
      return questaoSelecionadas.includes(id)
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
        
      });
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
                {verificarArray() ? "Excluir" : "Incluir"}
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
            { indice > 0 ? (
              <TouchableOpacity
              style={styles.btnContinuar}
              onPress={voltar}
            >
              <Text style={styles.label}>Voltar</Text>
            </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.btnContinuar, {backgroundColor: '#767577'}]} disabled={true} onPress={voltar}>
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
  };

