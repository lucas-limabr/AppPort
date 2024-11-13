import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { getFirestore, query, where, collection, getDocs, doc, getDoc, updateDoc, } from "firebase/firestore";
import { FIREBASE_APP } from "../../FirebaseConfig";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "react-native-vector-icons";
import Styles from "../Styles.js/StylesDescritores";
import { useNavigation } from "@react-navigation/native";
import "firebase/firestore";

import Markdown from "react-native-markdown-display";

export default function Questoes() {
  const [pergunta, setPergunta] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [id, setId] = useState(null);
  const [resposta, setResposta] = useState([]);
  const [urlImagem, setUrlImagem] = useState(null);
  const [indice, setIndice] = useState(0);
  const [atualizarDados, setAtualizarDados] = useState(false);
  const [questaoEstaNaLista, setQuestaoEstaNaLista] = useState(false);

  const route = useRoute();

  const navigation = useNavigation();

  const codigo = route.params.idLista;
  const [idLista, setIdLista] = useState(null);

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

  async function obterIdPorCodigo(codigo, colecao) {
    const colecaoRef = collection(db, colecao);

    // Crie uma consulta para encontrar documentos com base no campo "codigo"
    const q = query(colecaoRef, where("codigo", "==", codigo));

    try {
      // Execute a consulta e obtenha os resultados
      const querySnapshot = await getDocs(q);

      // Se houver pelo menos um documento correspondente, retorne o ID do primeiro
      if (!querySnapshot.empty) {
        const primeiroDocumento = querySnapshot.docs[0];

        return primeiroDocumento.id;
      } else {
        console.log("Nenhum documento encontrado com o código fornecido.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter ID por código:", error);
      return null;
    }
  }

  const selecionarQuestao = async (questaoId) => {
    try {
      const listaRef = doc(db, "listas", idLista);

      // Obtém os dados atuais da lista
      const listaDoc = await getDoc(listaRef);
      const listaData = listaDoc.data();

      // Verifica se a questão já está na lista
      const questaoRef = doc(db, "questoes", questaoId);

      const questaoDoc = await getDoc(questaoRef);

      if (questaoDoc.exists()) {
        const questaoIndex = listaData.questoes.findIndex(
          (ref) => ref.path === questaoRef.path
        );

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

        // Aguarde a resolução da Promise antes de definir o estado
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
      const listaRef = doc(db, "listas", idLista); // Utilize idLista aqui
      const questaoRef = doc(db, "questoes", id);

      // Obtenha os dados atuais da lista
      const listaDoc = await getDoc(listaRef);

      if (listaDoc.exists()) {
        const listaData = listaDoc.data();

        // Verifique se a questão está na lista
        const questaoEstaNaLista = listaData?.questoes?.some(
          (questao) =>
            questao?.path === questaoRef.path && questaoRef.path !== null
        );

        return questaoEstaNaLista;
      }
    } catch (error) {
      console.error("Erro ao verificar a lista de questões:", error);
      return false;
    }
  };

  const verificarEAtualizarEstado = async () => {
    const estaNaLista = await verificarArray(id);
    setQuestaoEstaNaLista(estaNaLista);
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
    const limparEstado = () => {
      setQuestaoEstaNaLista(false); // Limpa temporariamente o estado
    };

    const atualizarEstadoQuestao = async () => {
      if (id) {
        await verificarEAtualizarEstado();
      }
    };

    limparEstado();
    atualizarEstadoQuestao();
  }, [id]);


  useEffect(() => {
    fetchData().then((result) => {
      setPergunta(result.pergunta);
      setRespostaCorreta(result.respostaCorreta);
      setResposta(result.respostas);
      setUrlImagem(result.urlImagem);
      setId(result.id);
    });

    const obterIdLista = async () => {
      const idListaObtido = await obterIdPorCodigo(codigo, "listas");
      setIdLista(idListaObtido);
    };

    // Utilize uma função async dentro do useEffect
    const executarEfeitos = async () => {
      await verificarEAtualizarEstado(); // Aguarde a verificação do estado
      await obterIdLista(); // Aguarde a obtenção do idLista
    };

    executarEfeitos();
  }, [atualizarDados]);

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={styles.gradient}>
      <View style={Styles.voltar}>
        <TouchableOpacity style={styles.paginationButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" style={styles.iconStyle} />
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
            {pergunta}
          </Markdown>
        </View>

        <View style={styles.container}>
          <ScrollView style={styles.ScrollViewContent}>
            <TouchableOpacity
              style={[
                resposta[0] === respostaCorreta
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
                {resposta[0]}
              </Markdown>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                resposta[1] === respostaCorreta
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
                {resposta[1]}
              </Markdown>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                resposta[2] === respostaCorreta
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
                {resposta[2]}
              </Markdown>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                resposta[3] === respostaCorreta
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
                {resposta[3]}
              </Markdown>
            </TouchableOpacity>
            <View style={styles.containerContinuarProfessor}>
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
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
}
