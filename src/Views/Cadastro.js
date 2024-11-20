import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, Modal } from "react-native";
import Styles from "../Styles.js/StylesCadastro";
import { LinearGradient } from "expo-linear-gradient";
import { Switch } from "react-native-gesture-handler";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import styles from "../Styles.js/StylesTermoDeUso";
import TextPolicyPrivacy from "./TextPolicyPrivacy";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confimarEmail, setConfirmarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [souProfessor, setSouProfessor] = useState(false);
  const [urlImagemPerfil, setImagemPerfil] = useState("");

  const [visible, setVisible] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);
  const userCollectionRef = collection(db, "users");

  const aceitoProfessor = () =>
    setSouProfessor((previousState) => !previousState);

  function CustomModal() {
    const [aceitoTermo, setAceitoTermo] = useState(false);
    const switchTermo = () => setAceitoTermo((previousState) => !previousState);

    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.container}>
          <View style={styles.center}>
            <View style={styles.telaDoTermo}>
              <ScrollView>
                <TextPolicyPrivacy />
              </ScrollView>
            </View>
          </View>

          <View style={styles.switch}>
            <Switch
              trackColor={{ false: "#767577", true: "#FF8D94" }}
              thumbColor={aceitoTermo ? "#FF8D94" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={switchTermo}
              value={aceitoTermo}
            />
            <Text style={styles.textoSwitch}>Li e aceito os termos</Text>
          </View>
          <View style={styles.containerBotao}>
            <TouchableOpacity
              style={[
                styles.botao,
                !aceitoTermo && { backgroundColor: "#767577" },
              ]}
              disabled={!aceitoTermo}
              onPress={signUp}
            >
              <Text style={styles.textoBotao}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const signUp = async () => {
    try {
      const resposta = await createUserWithEmailAndPassword(auth, email, senha);
      await cadastroBD(resposta.user.uid);
      if (!souProfessor) {

        await cadastroFases(resposta.user.uid)
      }

    } catch (error) {
      if (error.code === "auth/invalid-email") {
        Alert.alert("Email inválido.")
      }
      if (error.code === "auth/weak-password") {
        Alert.alert("Sua senha necessita de pelo menos 6 caracteres.")
      }
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Email já cadastrado.")
      }

      console.log(error);
      setVisible(false);
    }
  };

  async function cadastroBD(userId) {
    const data = new Date

    await setDoc(doc(userCollectionRef, userId), {
      userId,
      nome,
      email,
      souProfessor,
      urlImagemPerfil,
      dataCadastro: data,
      ultimoAcesso: data,
    });
  }

  const cadastroFases = async (userId) => {
    const arraySubtema = [
      'classesGramaticais',
      'pronomes',
      'preposicoes',
      'conjuncoes',
      'flexoesVerbais',
      'silabas',
      'expressoesCotidianas',
      'acentuacao',
      'usoDosPorques',
      'crase',
      'pontuacao',
      'regencia',
      'figurasDeLinguagem',
      'concordancia',
      'vozesVerbais'
    ];

    const trilhaInfoRef = collection(db, "users", userId, "trilhaInfo");

    await Promise.all(arraySubtema.map(async (subtema) => {
      const trilhaInfoData = {
        subtema: subtema,
        ultimaFaseConcluida: 0,
      };

      const docRef = doc(trilhaInfoRef);
      await setDoc(docRef, trilhaInfoData);
    }));
  }

  const validarEmail = (email) => {
    const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    console.log(regex.test(email))
    return regex.test(email);
  }

  function cadastrar() {
    if (!validarEmail(email)) {
      Alert.alert("Email inválido")
      return
    }

    if (
      email != confimarEmail ||
      email == "" ||
      senha != confirmarSenha ||
      senha == "" ||
      nome == ""
    ) {
      Alert.alert("Dados incorretos");
    } else {
      setVisible(true);
    }
  }

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <ScrollView>
        <View style={Styles.container}>
          <View style={Styles.containerFilho}>
            <Text style={Styles.descricao}>Nome:</Text>

            <TextInput
              style={Styles.input}
              onChangeText={(text) => setNome(text)}
            />
          </View>

          <View style={Styles.containerFilho}>
            <Text style={Styles.descricao}>E-mail:</Text>

            <TextInput
              style={Styles.input}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={Styles.containerFilho}>
            <Text style={Styles.descricaoGrande}>Confirmação do e-mail:</Text>

            <TextInput
              style={Styles.input}
              onChangeText={(text) => setConfirmarEmail(text)}
            />
          </View>

          <View style={Styles.containerFilho}>
            <Text style={Styles.descricao}>Senha:</Text>

            <TextInput
              style={Styles.input}
              onChangeText={(text) => setConfirmarSenha(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={Styles.containerFilho}>
            <Text style={Styles.descricaoGrande}>Confirmação da senha:</Text>

            <TextInput
              style={Styles.input}
              onChangeText={(text) => setSenha(text)}
              secureTextEntry={true}
            />
          </View>

          <View style={Styles.containerFilho}>
            <View style={Styles.containerProfessor}>
              <Switch
                trackColor={{ false: "#767577", true: "#ffb9bd" }}
                thumbColor={souProfessor ? "#ffb9bd" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={aceitoProfessor}
                value={souProfessor}
              />

              <Text style={Styles.txtProfessor}>SOU PROFESSOR</Text>
            </View>
          </View>

          <TouchableOpacity style={Styles.botao} onPress={cadastrar}>
            <Text style={Styles.textBotao}>CADASTRAR</Text>
          </TouchableOpacity>
          <CustomModal />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
