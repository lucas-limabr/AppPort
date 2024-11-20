import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import Styles from "../Styles.js/StylesRespostaCorretaAluno";
import Styless from "../Styles.js/StylesRespostaIncorretaAluno";
import StylesEnd from "../Styles.js/StylesTerminouListaAluno";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import Markdown from "react-native-markdown-display";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import { getFirestore, doc, updateDoc } from "firebase/firestore";



export default function QuestoesTrilha() {
  const route = useRoute();
  const navigation = useNavigation();

  const db = getFirestore(FIREBASE_APP);

  const [questoes, setQuestoes] = useState([]);
  const [faseAtual, setFaseAtual] = useState(0);
  const [indice, setIndice] = useState(0);
  const [value, setValue] = useState("");
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [end, setEnd] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);

  const userId = route.params.params.info.userId;

  useEffect(() => {
    const questoesParam = route.params.params.info;

    setQuestoes(questoesParam);
    setFaseAtual(questoesParam[0].fase);

    setTimeout(() => {
      setShowInitialAnimation(false);
    }, 1100);
  }, [route.params.params.questoes]);

  const hasImage = (question) => {
    if (question.hasOwnProperty('urlImagem')) {
      if (question.urlImagem !=
        'https://firebasestorage.googleapis.com/v0/b/portuguito-6e8c8.appspot.com/o/aluno%2Fno_Image3.png?alt=media&token=7d319861-30ab-4f76-a3be-2060cd3f68b4'
      ) {
        return true;
      }
    }

    const noImageAnimations = [
      require('../Imagens/noImageAnimations/Alertinha.gif'),
      require('../Imagens/noImageAnimations/Lupinha.gif'),
    ];

    const randomImage = noImageAnimations[
      Math.floor(Math.random() * noImageAnimations.length)
    ];

    question.urlImagem = randomImage;
    return false;
  };

  const conferirQuestao = (respostaCorreta, respostaAluno) => {
    if (respostaCorreta === respostaAluno) {
      setAcertos(acertos + 1);
      setCorrect(true);
    } else {
      setErros(erros + 1);
      setIncorrect(true);
    }
  };

  const proximaQuestao = () => {
    setCorrect(false);
    setIncorrect(false);
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
    } else {
      setEnd(true);
    }
  };

  const finishActivity = async () => {
    setCorrect(false);
    setIncorrect(false);
    if (acertos > 6) {
      try {
        const userId = route.params.params.userId;
        const subTemaDoc = route.params.params.subTemaDoc;

        const subTemaRef = doc(db, "users", userId, "trilhaInfo", subTemaDoc.id);

        const lastCompletedFase = subTemaDoc.data().ultimaFaseConcluida;
        const faseAtual = questoes[0].fase;

        if (faseAtual > lastCompletedFase) {
          await updateDoc(subTemaRef, { ultimaFaseConcluida: lastCompletedFase + 1 });
        }
      } catch (error) {
        console.error("Erro ao atualizar a última fase concluída: ", error.message);
      }
    }

    navigation.goBack({ reload: true });
  };

  const ModalSad = () => {
    return (
      <Modal animationType="fade" transparent={false} visible={incorrect}>
        <LinearGradient
          colors={["#D5D4FB", "#9B98FC"]}
          style={Styless.gradient}
        >
          <View style={Styless.container}>
            <View style={Styless.boxTitle}>
              <Text style={Styless.Title}>Resposta incorreta</Text>
            </View>

            <View style={Styless.box}>
              <View style={Styless.boxImage}>
                <Image
                  style={Styless.ImageFormat}
                  source={require("../Imagens/animations/AnimacoesMascoteErrouMaioria.gif")}
                />
              </View>

              <View style={Styless.subDivTag}>
                <View style={Styless.subSubDivTag}>
                  <View style={Styless.tagText}>
                    <Text style={Styless.FontFormat}>Acertos:</Text>
                  </View>
                  <View style={Styless.tagText}>
                    <Text style={Styless.FontFormat}>Erros:</Text>
                  </View>
                </View>
              </View>

              <View style={Styless.buttomBox}>
                <TouchableOpacity
                  style={Styless.buttom}
                  onPress={() => proximaQuestao()}
                >
                  <Text style={[Styless.FontFormatButtom, Styless.shadow]}>
                    Próxima questão
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  const ModalHappy = () => {
    return (
      <Modal animationType="fade" transparent={false} visible={correct}>
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
          <View style={Styles.container}>
            <View style={Styles.boxTitle}>
              <Text style={Styles.Title}>
                MUITO BEM!
                <Text style={Styles.SubTitle}>Certa Resposta</Text>
              </Text>
            </View>

            <View style={Styles.box}>
              <View style={Styles.boxImage}>
                <Image
                  style={Styles.ImageFormat}
                  source={require("../Imagens/animations/AnimacoesMascoteAcimaDaMedia.gif")}
                />
              </View>

              <View style={Styles.subDivTag}>
                <View style={Styles.subSubDivTag}>
                  <View style={Styles.tagText}>
                    <Text style={Styles.FontFormat}>Acertos:</Text>
                  </View>
                  <View style={Styles.tagText}>
                    <Text style={Styles.FontFormat}>Erros:</Text>
                  </View>
                </View>
              </View>

              <View style={Styles.buttomBox}>
                <TouchableOpacity
                  style={Styles.buttom}
                  onPress={() => proximaQuestao()}
                >
                  <Text style={[Styles.FontFormatButtom, Styles.shadow]}>
                    Próxima questão
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  const ModalEnd = () => {
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
                    Você acertou todas as questões e passou de fase!
                  </Text>
                </Text>
              ) : acertos > 6 ? (
                <Text style={StylesEnd.Title}>
                  PARABÉNS!!
                  <Text style={StylesEnd.SubTitle}>
                    Você passou de fase!
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
                ) : acertos > 6 ? (
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

  const [btnRadioClicado, setbtnRadioClicado] = useState(true);


  return (

    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      <ModalHappy />
      <ModalSad />
      <ModalEnd />
      {questoes && questoes[indice] && !showInitialAnimation ? (
        <View style={styles.container}>
          <View style={styles.enunciado}>
            <View style={styles.backgroundImagem}>
              {hasImage(questoes[indice]) ? (
                <TouchableOpacity onPress={() => setIsExpanded(true)}>
                  <Image
                    style={styles.imagem}
                    source={{ uri: questoes[indice].urlImagem }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Image
                    style={styles.imagem}
                    source={questoes[indice].urlImagem}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
              }

              {/* Modal para exibir a imagem expandida */}
              <Modal visible={isExpanded} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                  <TouchableOpacity onPress={() => setIsExpanded(false)}>
                    <Image source={{ uri: questoes[indice].urlImagem }} style={styles.fullImage} />
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
              {questoes[indice].pergunta}
            </Markdown>
          </View>

          <View style={styles.container}>
            <ScrollView>
              <RadioButtonGroup
                selected={value}
                onSelected={(value) => {
                  setValue(value)
                  setbtnRadioClicado(false)
                }}
                radioBackground="#F54F59"
              >

                {questoes[indice].respostas.map((resposta, index) => (
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
                      questoes[indice].respostaCorreta,
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
            source={require("../Imagens/animation.gif")}
            resizeMode="contain"
          />
        </View>
      )}
    </LinearGradient>
  );
}
