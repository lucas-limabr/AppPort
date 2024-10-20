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

import { useFocusEffect } from "@react-navigation/native";

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
  const [questoesCarregadas, setQuestoesCarregadas] = useState(false);
  const [atualizar, setAtualizar] = useState(true);

  const navigation = useNavigation();

  const questoesCarregadasRef = useRef(questoesCarregadas);

  useEffect(() => {
    questoesCarregadasRef.current = questoesCarregadas;
  }, [questoesCarregadas]);

  const obterQuestoes = useCallback(async () => {
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
          // Utilize o callback de estado para garantir que está atualizado
          setQuestoesCarregadas((prevState) => !prevState);
        } else {
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
  }, [obterQuestoes, navigation, atualizar]);
  
  const refreshComponent = () => {
    setAtualizar((prevKey) => prevKey + 1);
  };
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshComponent();
    });

    return unsubscribe;
  }, [navigation]);

  function continuar() {
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
    }
    if (indice == questoes.length - 1) {
      Alert.alert(
        "Fim",
        "Você chegou ao final da lista",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
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
        <TouchableOpacity
          onPress={() => {
            setIndice(0);
            navigation.goBack();
          }}
        >
          <AntDesign name="caretleft" size={50} color="#F54F59" />
        </TouchableOpacity>
      </View>
      {questaoAtual ? (
        <View style={styles.container}>
          <View style={styles.containerSalvar}></View>

          <View style={styles.enunciado}>
            <View style={styles.backgroundImagem}>
              <Image
                style={styles.imagem}
                source={{ uri: questaoAtual.urlImagem }}
                resizeMode="contain"
              />
            </View>
            <Markdown
              style={{
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
              }}
            >
              {questaoAtual.pergunta}
            </Markdown>
          </View>

          <View style={styles.containerResposta}>
            <ScrollView>
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
                  <Markdown
                    style={{
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
                    }}
                  >
                    {resposta}
                  </Markdown>
                </TouchableOpacity>
              ))}

              <View style={styles.containerContinuarProfessor}>
                {indice > 0 ? (
                  <TouchableOpacity
                    style={styles.btnContinuar}
                    onPress={voltar}
                  >
                    <Text style={styles.label}>Voltar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.btnContinuar,
                      { backgroundColor: "#767577" },
                    ]}
                    disabled={true}
                    onPress={voltar}
                  >
                    <Text style={styles.label}>Voltar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.btnContinuar}
                  onPress={continuar}
                >
                  <Text style={styles.label}>Continuar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
