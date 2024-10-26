import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import StylesEnd from "../Styles.js/StylesTerminouListaAluno";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import Markdown from "react-native-markdown-display";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

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
import { FIREBASE_AUTH } from "../../FirebaseConfig";

export default function QuestoesTrilha() {
  const route = useRoute();
  const navigation = useNavigation();

  const [questoes, setQuestoes] = useState([]);
  const [indice, setIndice] = useState(0);
  const [value, setValue] = useState("");
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [end, setEnd] = useState(false);
  const [atualizar, setAtualizar] = useState(true);

  const userId = route.params.params.info.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(FIREBASE_APP);
        const questoesRefs = route.params.params.info.questoes;

        const questoesDocs = await Promise.all(
          questoesRefs.map(async (ref) => {
            const questaoDoc = await getDoc(ref);
            if (questaoDoc.exists()) {
              return { id: questaoDoc.id, data: questaoDoc.data() };
            } else {
              return null;
            }
          })
        );
        const questoesValidas = questoesDocs.filter(
          (questao) => questao !== null
        );
        setQuestoes(questoesValidas);
      } catch (error) {

      }
    };
    fetchData();
  }, [route.params.params.questoes]);

  const conferirQuestao = (respostaCorreta, respostaAluno) => {
    if (respostaCorreta === respostaAluno) {
      setAcertos(acertos + 1);
    } else {
      setErros(erros + 1);
    }
    proximaQuestao();
  };

  const proximaQuestao = () => {
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
    } else {
      setEnd(true);
    }
  };

  const finishActivity = async () => {
    if (acertos >= questoes.length - 2) {
      try {
        const db = getFirestore(FIREBASE_APP);
        const documentoRef = doc(db, "users", userId);
        const usuarioRef = doc(
          documentoRef,
          "userFases",
          route.params.params.info.id
        );
        await updateDoc(usuarioRef, {
          concluido: true,
        });
      } catch (error) {

      }
    }
    navigation.goBack({ reload: true });
  };

  const MarkdownRadioButton = ({ label, value, checked, onChange }) => {
    return (
      <View>
        <RadioButton.Item
          label={<Markdown>{label}</Markdown>}
          value={value}
          status={checked === value ? "checked" : "unchecked"}
          onPress={() => onChange(value)}
        />
      </View>
    );
  };

  const ModalEnd = () => {
    const acertosPercentual = acertos / questoes.length * 100
    const acertouTodas = acertos === questoes.length
    return (
      <Modal animationType="fade" transparent={false} visible={end}>
        <LinearGradient
          colors={["#D5D4FB", "#9B98FC"]}
          style={StylesEnd.gradient}
        >
          <View style={StylesEnd.container}>
            <View style={StylesEnd.boxTitle}>
              {acertouTodas ? (
                <Text style={StylesEnd.Title}>
                  PERFEITO!!
                  <Text style={StylesEnd.SubTitle}>
                    Você acertou todas as questões!
                  </Text>
                </Text>
              ) : acertosPercentual > 50 ? (
                <Text style={StylesEnd.Title}>
                  PARABÉNS!!
                  <Text style={StylesEnd.SubTitle}>
                    Você acertou boa parte das questões!
                  </Text>
                </Text>
              ) : (
                <View>
                  <Text style={StylesEnd.Title}>
                    FOI POR POUCO
                  </Text>
                  <Text style={StylesEnd.SubTitle}>
                    Tente novamente...
                  </Text>
                </View>
              )}
            </View>

            <View style={StylesEnd.box}>
              <View style={StylesEnd.boxImage}>
                {acertouTodas ? (
                  <Image
                    style={StylesEnd.ImageFormat}
                    source={require("../Imagens/animations/AnimacoesMascoteAcertatudo.gif")}
                  />
                ) : acertosPercentual > 50 ? (
                  <Image
                    style={StylesEnd.ImageFormat}
                    source={require("../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif")}
                  />
                ) : (
                  <Image
                    style={StylesEnd.ImageFormat}
                    source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                  />
                )}

              </View>

              <View style={StylesEnd.subDivTag}>
                <View style={StylesEnd.subSubDivTag}>
                  <View style={StylesEnd.tagText}>
                    <Text style={StylesEnd.FontFormat}>Acertos: {acertos}</Text>
                  </View>
                  <View style={StylesEnd.tagText}>
                    <Text style={StylesEnd.FontFormat}>Erros: {erros}</Text>
                  </View>
                </View>
              </View>

              <View style={StylesEnd.buttomBox}>
                <TouchableOpacity
                  style={StylesEnd.buttom}
                  onPress={() => finishActivity()}
                >
                  <Text style={[StylesEnd.FontFormatButtom, StylesEnd.shadow]}>
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  const [isExpanded, setIsExpanded] = useState(false);
 
  const[btnRadioClicado, setbtnRadioClicado] = useState(true);
  

  return (
   
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      <ModalEnd />
      {questoes && questoes[indice] ? (
        <View style={styles.container}>
          <View style={styles.enunciado}>
            <View style={styles.backgroundImagem}>
              <TouchableOpacity onPress={() => setIsExpanded(true)}>
                <Image
                  style={styles.imagem}
                  source={{ uri: questoes[indice].data.urlImagem }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Modal para exibir a imagem expandida */}
              <Modal visible={isExpanded} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                  <TouchableOpacity onPress={() => setIsExpanded(false)}>
                    <Image source={{ uri: questoes[indice].data.urlImagem }} style={styles.fullImage} />
                  </TouchableOpacity>
                </View>
              </Modal>
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
              {questoes[indice].data.pergunta}
            </Markdown>
          </View>

          <View style={styles.container}>
            <ScrollView>
              <RadioButtonGroup
                selected={value}
                onSelected={(value) => 
                  {setValue(value)
                    setbtnRadioClicado(false)
                  }}
                radioBackground="#F54F59"
              >
          
                {questoes[indice].data.respostas.map((resposta, index) => (
                  <RadioButtonItem
                    key={index}
                    label={
                      <View
                      style={{
                          flexDirection: "row-reverse",
                          backgroundColor: "#ffb9bd",
                          borderRadius: 50,
                          width: 300,
                          marginTop: 5,
                          height: "auto",
                          left: -24,
                          position: "relative",
                          zIndex: -1,
                        }}
                      >
                        <Markdown
                          style={{
                            body: {
                              fontSize: 16,
                              color: "#fff",
                              top: 0,
                              width: "90%",
                              left: -0.5,
                              padding: 5,
                              textAlign: "center",
                              fontFamily: "Inder_400Regular",
                            },
                          }}
                        >
                          {resposta}
                        </Markdown>
                      </View>
                    }
                    value={resposta}
                    style={{ borderWidth: 1, borderColor: "#fff", left: 4, top: 3, backgroundColor: '#fff', width: 25, height: 25 }}
                  />
                ))}
              </RadioButtonGroup>
              <View style={styles.containerContinuar}>
                <TouchableOpacity
                  style={[styles.confirmar, btnRadioClicado ? styles.btnDesativado : styles.btnAtivado]}
                  disabled={btnRadioClicado}
                  onPress={() => {
                    conferirQuestao(
                      questoes[indice].data.respostaCorreta,
                      value
                    )
                    setbtnRadioClicado(true)
                  }}
                >
                  <Text style={styles.label}>Confirmar</Text>
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
            source={require("../Imagens/AnimaFinal.gif")}
            resizeMode="contain"
          />
        </View>
      )}
    </LinearGradient>
  );
}
