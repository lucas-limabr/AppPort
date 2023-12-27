import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
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

import {
  getFirestore,
  collection,
  where,
  doc,
  get,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";

export default function QuestoesLista() {
  const route = useRoute();
  const codigoLista = route.params.itemId;
  const [questoes, setQuestoes] = useState([]);
  const [indice, setIndice] = useState(0);

  const navigation = useNavigation();

  const teste = '## teste teste'

  useEffect(() => {
    const obterQuestoes = async () => {
      try {
        setIndice(0);
        const db = getFirestore(FIREBASE_APP);
        const listaCollectionRef = collection(db, "listas");
        const q = query(listaCollectionRef, where("codigo", "==", codigoLista));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();

          if (data && data.questoes) {
            const referenciasQuestoes = data.questoes;

            const questoesPromises = referenciasQuestoes.map(
              async (referencia) => {
                const questaoDoc = await getDoc(referencia);
                if (questaoDoc.exists()) {
                  return questaoDoc.data();
                } else {
                  console.warn(
                    "Documento de questão não encontrado:",
                    referencia.id
                  );
                  return null;
                }
              }
            );

            const questoesArrayResultado = await Promise.all(questoesPromises);

            // Filtra para remover entradas nulas ou indefinidas
            const questoesFiltradas = questoesArrayResultado.filter(
              (questao) => questao
            );

            setQuestoes(questoesFiltradas);
            
          } else {
            console.log("Documento não contém a estrutura esperada.");
          }
        } else {
          console.log("Documento não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao obter as questões:", error);
      }
    };

    obterQuestoes();
  }, [codigoLista]);

  function continuar() {
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
    }
  }

  function voltar() {
    if (indice > 0) {
      setIndice(indice - 1);
    }
  }

  const questaoAtual = questoes[indice];

  

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      <View style={Styles.voltar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="caretleft" size={50} color="#F54F59" />
        </TouchableOpacity>
      </View>
      {questaoAtual ? (
        <View style={styles.container}>
          <View style={styles.containerSalvar}>
            
          </View>
          <View style={styles.enunciado}>
            <View style={styles.backgroundImagem}>
              <Image
                style={styles.imagem}
                source={{ uri: questaoAtual.urlImagem }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.txtEnunciado}>{questaoAtual.pergunta}</Text>
          </View>

          <View style={styles.containerResposta}>
            <ScrollView style={styles.scroll}>
              {/* Mapear o array de respostas */}
              {questaoAtual.respostas.map((resposta, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    resposta === questaoAtual.respostaCorreta
                      ? [styles.alternativas, styles.selectLabel]
                      : styles.alternativas,
                  ]}
                >
                  <Text style={styles.txtEnunciado}>{resposta}</Text>
                </TouchableOpacity>
              ))}
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
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Markdown>Aguarde, carregando questões... </Markdown>
        </View>
      )}
    </LinearGradient>
  );
}
