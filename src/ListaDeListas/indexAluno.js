import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Styles from "../Styles.js/StylesRespostaCorretaAluno";
import Styless from "../Styles.js/StylesRespostaIncorretaAluno";
import StylesEnd from "../Styles.js/StylesTerminouListaAluno";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import Markdown from "react-native-markdown-display";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

export default function QuestoesAluno() {
  const route = useRoute();
  let codigoLista = route.params.itemId;
  const [questoes, setQuestoes] = useState([]);
  const [indice, setIndice] = useState(0);
  const [questoesCarregadas, setQuestoesCarregadas] = useState(false);
  const [value, setValue] = useState("");
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [end, setEnd] = useState(false);
  const [atualizar, setAtualizar] = useState(true);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);

  const auth = FIREBASE_AUTH;

  const aluno = auth.currentUser.uid;

  const navigation = useNavigation();

  const questoesCarregadasRef = useRef(questoesCarregadas);

  useEffect(() => {
    setShowInitialAnimation(true);
    codigoLista = route.params.itemId;

    setIndice(0);
    setQuestoesCarregadas(false);

    if (codigoLista) {
      const obterQuestoes = async () => {
        try {
          const db = getFirestore(FIREBASE_APP);
          const documentoRef = doc(db, "ListaAluno", codigoLista);
          const documentoSnapshot = await getDoc(documentoRef);

          if (documentoSnapshot.exists()) {
            const data = documentoSnapshot.data();

            if (data && data.questoes.length > 0) {
              const referenciasQuestoes = data.questoes;
              const questoesPromises = referenciasQuestoes.map(
                async (referencia) => {
                  const questaoDoc = await getDoc(referencia);
                  return questaoDoc.exists() ? questaoDoc.data() : null;
                }
              );

              const questoesArrayResultado =
                await Promise.all(questoesPromises);
              const questoesFiltradas = questoesArrayResultado.filter(
                (questao) => questao
              );
              setQuestoes(questoesFiltradas);
              setQuestoesCarregadas(true);

              const acertos = 0;
              const erros = 0;
              setAcertos(acertos);
              setErros(erros);
            } else {
              setQuestoesCarregadas(false);
            }
          } else {
            console.log("Documento não encontrado.");
          }
        } catch (error) {
        }
      };

      obterQuestoes();
    }

    setTimeout(() => {
      setShowInitialAnimation(false);
    }, 700);
  }, [codigoLista, navigation, atualizar]);

  const refreshComponent = () => {
    setAtualizar((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshComponent();
    });

    return unsubscribe;
  }, [navigation]);

  const conferirQuestao = async (respostaCorreta, respostaALuno) => {
    try {
      const novosAcertos =
        respostaCorreta === respostaALuno ? acertos + 1 : acertos;
      const novosErros = respostaCorreta !== respostaALuno ? erros + 1 : erros;

      const db = getFirestore(FIREBASE_APP);
      const listaDocRef = doc(db, "ListaAluno", codigoLista);
      const listaDocSnapshot = await getDoc(listaDocRef);

      if (listaDocSnapshot.exists()) {
        await updateDoc(listaDocRef, {
          acertos: novosAcertos,
          erros: novosErros,
        });

        setAcertos(novosAcertos);
        setErros(novosErros);

        respostaCorreta === respostaALuno
          ? setCorrect(true)
          : setIncorrect(true);
      }
    } catch (error) {

    }
  };

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


  const proximaQuestao = () => {
    if (indice < questoes.length - 1) {
      setIndice(indice + 1);
      setCorrect(false);
      setIncorrect(false);
    } else {
      setEnd(true);
    }
  };

  const finishList = () => {
    setIndice(0);
    setCorrect(false);
    setIncorrect(false);
    setAcertos(0);
    setErros(0);
    setEnd(false);
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
    return (
      <Modal animationType="fade" transparent={false} visible={end}>
        <LinearGradient
          colors={["#D5D4FB", "#9B98FC"]}
          style={StylesEnd.gradient}
        >
          <View style={StylesEnd.container}>
            <View style={StylesEnd.boxTitle}>
              <Text style={StylesEnd.Title}>
                PARABÉNS!!
                <Text style={StylesEnd.SubTitle}>Você terminou a lista</Text>
              </Text>
            </View>

            <View style={StylesEnd.box}>
              <View style={StylesEnd.boxImage}>
                <Image
                  style={StylesEnd.ImageFormat}
                  source={require("../Imagens/animations/AnimacoesMascoteAcertatudo.gif")}
                />
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
                  onPress={() => finishList()}
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

  const questaoAtual = questoes[indice];
  const [btnRadioClicado, setbtnRadioClicado] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      <ModalHappy />
      <ModalSad />
      <ModalEnd />
      {questoesCarregadas && questaoAtual && !showInitialAnimation ? (
        <View style={styles.container}>
          <View style={styles.enunciado}>
            <View style={styles.backgroundImagem}>
              {hasImage(questaoAtual) ? (
                <TouchableOpacity onPress={() => setIsExpanded(true)}>
                  <Image
                    style={styles.imagem}
                    source={{ uri: questaoAtual.urlImagem }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Image
                    style={styles.imagem}
                    source={questaoAtual.urlImagem}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
              }

              {/* Modal para exibir a imagem expandida */}
              <Modal visible={isExpanded} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                  <TouchableOpacity onPress={() => setIsExpanded(false)}>
                    <Image source={{ uri: questaoAtual.urlImagem }} style={styles.fullImage} />
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
              {questaoAtual.pergunta}
            </Markdown>
          </View>

          <View style={styles.container}>
            <ScrollView >
              <RadioButtonGroup
                selected={value}
                onSelected={(value) => {
                  setValue(value)
                  setbtnRadioClicado(false)
                }}
                radioBackground="#F54F59"
              >
                {questaoAtual.respostas.map((resposta, index) => (
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
              <TouchableOpacity
                style={[styles.confirmar, btnRadioClicado ? styles.btnDesativado : styles.btnAtivado]}
                onPress={() => {
                  conferirQuestao(questaoAtual.respostaCorreta, value)
                  setbtnRadioClicado(true)
                }}
                disabled={btnRadioClicado}
              >
                <Text style={styles.label}>Confirmar</Text>
              </TouchableOpacity>
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
