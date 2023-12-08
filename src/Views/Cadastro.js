import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import Styles from "../Styles.js/StylesCadastro";
import { LinearGradient } from "expo-linear-gradient";
import { Switch } from "react-native-gesture-handler";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import styles from "../Styles.js/StylesTermoDeUso";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cadastro({ navigation }) {
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
                <Text style={styles.termoDeUso}>
                  Política de privacidade e Termos de uso do Portuguito
                  {"\n"}O Portuguito foi desenvolvido para ser utilizado por
                  professores e por alunos de escolas públicas e privadas do
                  Brasil. De todo modo, o software pode ser utilizado para
                  quaisquer outros fins de aprendizado de Língua Portuguesa,
                  desde que seja direcionado para a educação. Seu caráter é
                  eminentemente educativo, não devendo ser usado para outras
                  finalidades. O objetivo do desenvolvimento deste aplicativo é
                  o ensino de Língua Portuguesa. Os textos dos itens (os
                  suportes) foram retirados de sites, revistas, jornais e blogs
                  embora o enunciado e as alternativas sejam autorais. Sendo
                  assim, os itens não devem ser passíveis de cópias sem
                  autorização expressa de seus criadores. Os desenhos e as
                  ilustrações deste software são autoriais e, portanto, não
                  passíveis de cópias sem a autorização expressa de seus
                  criadores. Os direitos de uso dos itens criados são
                  EXCLUSIVAMENTE dos criadores deste software, não podendo ser
                  usado em outros âmbitos que não sejam os do aplicativo. Sendo
                  assim, cabe SOMENTE aos autores o direito exclusivo de adaptar
                  e reproduzir parcial ou integralmente as questões criadas. Os
                  usuários do Portuguito têm direito de utilizar e fazer os
                  exercícios, sendo vedada a reprodução destes em quaisquer
                  outros meios. Nossos termos proíbem que nossos usuários, aos
                  usar nossos serviços, violem os direitos de propriedade
                  intelectual de um indivíduo, incluindo seus direitos autorais
                  e marcas registradas. O Portuguito precisa receber ou coletar
                  algumas informações para operar, melhorar, entender,
                  personalizar seus serviços e oferecer suporte para suas
                  ferramentas, principalmente quando o usuário os instala,
                  acessa ou usa. A proteção, a segurança e a integridade são
                  essenciais para nossos serviços. Usamos as informações que
                  temos para verificar as contas e as atividades, combater
                  condutas nocivas, proteger usuários de experiências ruins,
                  mensagens indesejadas, promover a proteção, a segurança e a
                  integridade dentro de nossos serviços, investigando atividades
                  suspeitas e/ou violações de nossos termos e políticas. Os
                  dados coletados pelo software como nome, idade, endereço de
                  e-mails não serão divulgados em quaisquer meios de forma que
                  cause constrangimento para os usuários. A identidade dos
                  usuários será SEMPRE mantida em sigilo. Como explicado
                  detalhadamente, reiteramos que, ao fornecermos nossos
                  serviços, não armazenamos as mensagens de nossos usuários. No
                  entanto, armazenamos as informações de conta de nossos
                  usuários, como foto e nome de perfil, caso os usuários decidam
                  usá-las como parte das informações de suas contas. Para
                  denunciar violações de direitos autorais e solicitar que o
                  Portuguito remova qualquer conteúdo armazenado que esteja
                  violando estes direitos (por exemplo, foto, nome de perfil e
                  endereço de e-mail), envie e-mail para o endereço:
                  portuguitobrasil@gmail.com . Podemos alterar ou atualizar
                  nossa Política de Privacidade. Caso isso aconteça,
                  notificaremos o usuário sobre alterações feitas na Política de
                  Privacidade e nos Termos de Uso. Se houver quaisquer dúvidas
                  ou preocupações sobre nossa Política de Privacidade e/ou sobre
                  os Termos de Uso, entre em contato pelo e-mail:
                  portuguitobrasil@gmail.com .
                </Text>
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
      cadastroBD();
    } catch (error) {
      Alert.alert("erro" + error.message);
      console.log(error);
      setVisible(false);
    }
  };

  const localStorage = async (nome, email, urlImagemPerfil) => {
    const usuarioAssincrono = {
      nome: nome,
      email: email,
      urlImagemPerfil: urlImagemPerfil,
    };
    const usuarioString = JSON.stringify(usuarioAssincrono);

    await AsyncStorage.setItem("@portuguito2023", usuarioString);

    const teste = await AsyncStorage.getItem("@portuguito2023");
    console.log(usuarioString === teste);
  };

  async function cadastroBD() {
    const user = await addDoc(userCollectionRef, {
      nome,
      email,
      souProfessor,
      urlImagemPerfil,
    });
    localStorage(nome, email, urlImagemPerfil);
  }

  function cadastrar() {
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
