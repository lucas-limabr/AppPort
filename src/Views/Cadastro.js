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

  //3º função chamada. Tenta criar um novo usuário no Firebase
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

  //4º função chamada. Ela cria o objeto usuário no banco de dados (Firestore) 
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

  //5º função chamada. Se o usuário for um aluno, essa função cria as fases no Firestore para o usuário
  const cadastroFases = async (userId) => {
    //a subcoleção userFases será criada dinamicamente
    //referência para a subcoleção 'userFases' dentro do documento do usuário
    const userCollectionRef = collection(db, "users", userId, "userFases");

    //referência para a coleção original de fases ('fase'), de onde os dados serão copiados
    const colecaoOriginal = collection(db, "fase");

    //obtém todos os documentos da coleção 'fase'
    const querySnapshot = await getDocs(colecaoOriginal);

    //itera sobre cada documento (fase) encontrado na coleção original
    querySnapshot.forEach(async (docOriginal) => {
      //cria uma referência para um novo documento na coleção 'userFases' usando o mesmo ID do documento original
      try {
        const newDocRef = doc(userCollectionRef, docOriginal.id);

        // Prepara os dados do novo documento que será inserido, copiando os dados do original e adicionando campos personalizados
        const newDocData = {
          ...docOriginal.data(), //copia todos os dados do documento original
          userId: userId, //adiciona o ID do usuário para vincular a fase a esse usuário
          concluido: false, //adiciona o campo 'concluido' para marcar o progresso da fase (inicialmente false)
          id: newDocRef.id //o ID do novo documento é o mesmo do original
        };

        //insere o novo documento na subcoleção 'userFases' com os dados preparados
        await setDoc(newDocRef, newDocData);

        console.log("Novo documento criado:", newDocData);
      }
      catch (error) {
        console.error("Erro ao criar fase:", error)
      }
    });
  }

  //2º função chamada. Ela validará o email informado pelo usuário, retorna true se o formato é válido 
  const validarEmail = (email) => {
    const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    console.log(regex.test(email))
    return regex.test(email);
  }

  //1º função chamada. Ela verificará se os inputs do usuário estão adequados
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
          {/* componente funcional que renderiza o modal (termo de uso). Sua exibição é controlada por um useState */}
          <CustomModal />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
