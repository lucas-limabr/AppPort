import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, Alert, FlatList, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLista";
import style from "../Styles.js/StylesModalLista";
import { AntDesign } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getFirestore, getId, where } from "firebase/firestore";
import { addDoc, collection, query, getDocs, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { validateListName, deleteList, fetchQuestionIdByTitle } from '../FuncoesFirebase/Funcoes'
import { nanoid } from "nanoid";
import "react-native-get-random-values";
import { userReference } from "../FuncoesFirebase/Funcoes";

export default function Listas() {
  const [atualizarDados, setAtualizarDados] = useState(false);
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const collectionRef = collection(db, "listas");

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleCodigo, setVisibleCodigo] = useState(false)
  const [itemId, setItemId] = useState('')
  const [itemFinalizado, setItemFinalizado] = useState(false)

  const navigation = useNavigation()

  const [listas, setListas] = useState([]);

  const criador = auth.currentUser.uid;
  const referenciaCriador = doc(db, "users", criador);

  const codigo = nanoid(6);

  //A função recupera as listas criadas pelo usuário logado
  async function buscarListasDoFirestore() {

    try {
      const usuarioLogadoReference = await userReference();

      const listasCollection = collection(getFirestore(), "listas");
      const listasQuery = query(listasCollection, where("criador", "==", usuarioLogadoReference));

      const listasSnapshot = await getDocs(listasQuery);

      const listas = [];

      listasSnapshot.forEach((doc) => {
        const listaData = doc.data();
        listas.push(listaData);
      });

      return listas;
    } catch (error) {
      console.error(error);
      // Lidar com o erro conforme necessário
    }
  }

  async function carregarListas() {
    const listasDoFirestore = await buscarListasDoFirestore();
    setListas(listasDoFirestore);
  }

  async function criarLista(nomeLista) {
    try {
      try {
        const usuarioLogadoReference = await userReference();
        await validateListName(nomeLista, usuarioLogadoReference);
      } catch (error) {
        Alert.alert("Erro: " + error.message);
        throw error;
      }

      setVisible(false);

      const novaLista = {
        criador: referenciaCriador,
        codigo: codigo,
        nomeLista,
        questoes: [],
        finalizado: false,
      };


      await addDoc(collectionRef, novaLista);

      carregarListas();

      Alert.alert("Lista criada com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

  const carregarItemId = (id, finalizado) => {
    setVisibleEdit(true)
    setItemId(id)
    setItemFinalizado(finalizado)
  }

  const carregarLista = (id) => {
    setItemId(id)
    navigation.navigate('StackNav', { screen: 'QuestoesLista', params: { itemId: id } })
  }

  useFocusEffect(
    useCallback(() => {
      carregarListas()
    }, [atualizarDados])
  );

  const BotaoLista = ({ titulo, finalizado, questoes, onBotaoPress, onPressOne }) => {

    const handleBotaoPress = async () => {
      onBotaoPress();
    };


    const handleListNavigation = async () => {
      if (questoes.length === 0) {
        Alert.alert("Lista Vazia", "Esta lista não contém questões e portanto não pode ser acessada.");
        return;
      }

      onPressOne();
    };

    const fetchId = async () => {
      const id = await fetchQuestionIdByTitle(titulo, 'listas', referenciaCriador);

      return id;
    }



    const handleDelete = async () => {
      const listId = await fetchId();
      await deleteList(listId);

      carregarListas();

      Alert.alert("Lista excluída com sucesso");
    }

    return (
      <TouchableOpacity style={Styles.lista} onPress={handleListNavigation}>
        <View style={Styles.containerInfo}>
          <TouchableOpacity style={{ marginLeft: 5, marginTop: 0 }} onPress={(handleBotaoPress)}>
            <FontAwesome5 name="ellipsis-h" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={Styles.txtLista}>
            {titulo}
          </Text>
          <TouchableOpacity style={{ backgroundColor: '#F54F59' }} onPress={handleDelete}>
            <EvilIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={Styles.txtStatus}>
            {finalizado ? "Status: Finalizada" : "Status: Não Finalizada"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function Lista({ titulo1, finalizado, questoes, onBotaoPress, onPressOne }) {

    return (
      <View style={Styles.containerFilho}>
        <BotaoLista
          titulo={titulo1}
          finalizado={finalizado}
          questoes={questoes}
          onBotaoPress={onBotaoPress}
          onPressOne={onPressOne}
        />
      </View>
    )
  }

  function ModalLista() {
    const [nomeLista, setNomeLista] = useState("");
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={style.container}>
          <View style={style.boxGeral}>
            <View style={{ alignItems: "center" }}>
              <Text style={style.titulo}>CRIAR LISTA</Text>
            </View>

            <View style={{ justifyContent: "center", height: 185 }}>
              <Text style={style.label}>Nome da lista:</Text>
              <TextInput
                style={style.input}
                onChangeText={(text) => setNomeLista(text)}
              ></TextInput>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={style.botao}
                onPress={() => criarLista(nomeLista)}
              >
                <Text style={style.txtBotao}>SALVAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.botao}
                onPress={() => setVisible(false)}
              >
                <Text style={style.txtBotao}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const ModalEditar = () => {
    const confirmarFinalizacao = () => {
      Alert.alert(
        "Finalizar Lista",
        "Tem certeza que deseja finalizar esta lista? Essa ação não pode ser desfeita.",
        [
          {
            text: "Cancelar   ",
            style: "cancel",
          },
          {
            text: "Sim, finalizar",
            onPress: () => finalizarLista(),
          },
        ]
      );
    };

    const finalizarLista = async () => {
      try {
        const listasCollection = collection(getFirestore(), "listas");
        const listasQuery = query(listasCollection, where("codigo", "==", itemId));
        const listasSnapshot = await getDocs(listasQuery);
        const docData = listasSnapshot.docs[0].data();
        const ref = listasSnapshot.docs[0].ref;

        if (docData.questoes.length === 0) {
          Alert.alert("Lista Incompleta", "Esta lista não contém questões e portanto não pode ser finalizada.");
          return;
        }

        await updateDoc(ref, { finalizado: true });

        setVisibleEdit(false);
        Alert.alert("Lista finalizada com sucesso!");
        carregarListas();
      } catch (error) {
        console.log("Erro ao finalizar lista:", error);
      }
    };

    return (
      <Modal animationType="slide" transparent={true} visible={visibleEdit}>
        <View style={style.container}>
          <View style={style.boxGeral}>
            <View style={{ alignItems: "center" }}>
              <View style={{ justifyContent: "center", height: 185 }}>
                {itemFinalizado ? (
                  <TouchableOpacity
                    style={style.botaoEditar}
                    onPress={() => { setVisibleEdit(false); setVisibleCodigo(true) }}
                  >
                    <Text style={style.txtEditar}>Exibir código</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={style.botaoEditar}
                      onPress={() => { navigation.navigate('StackNav', { screen: 'Menu', params: { itemId } }); setVisibleEdit(false) }}
                    >
                      <Text style={style.txtEditar}>Adicionar/Remover questões</Text>
                    </TouchableOpacity >

                    <TouchableOpacity
                      style={style.botaoEditar}
                      onPress={confirmarFinalizacao}
                    >
                      <Text style={style.txtEditar}>Finalizar</Text>
                    </TouchableOpacity>
                  </>
                )}

                <TouchableOpacity
                  style={style.botaoEditar}
                  onPress={() => setVisibleEdit(false)}
                >
                  <Text style={style.txtEditar}>Fechar</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalCodigo = () => {

    return (
      <Modal animationType="slide" transparent={true} visible={visibleCodigo}>
        <View style={style.container}>
          <View style={style.boxGeral}>
            <View style={{ alignItems: "center" }}>

              <View style={{ justifyContent: "center", height: 185 }}>
                <TouchableOpacity style={style.botaoEditar} >
                  <Text style={style.txtEditar}>Código: {itemId}</Text>
                </TouchableOpacity >
                <TouchableOpacity style={style.botaoEditar} onPress={() => { setVisibleCodigo(false); setVisibleEdit(false) }} >
                  <Text style={style.txtEditar}>Fechar</Text>
                </TouchableOpacity >

              </View>

            </View>

          </View>
        </View>
      </Modal>
    );
  };

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <ModalLista />
      <ModalEditar />
      <ModalCodigo />

      <View style={Styles.container}>
        <View style={Styles.containerList}>
          <TouchableOpacity
            style={Styles.addLista}
            onPress={() => setVisible(true)}
          >
            <Text style={Styles.criarLista}>Criar lista</Text>
            <AntDesign name="plus" size={50} color="#F54F59" />
          </TouchableOpacity>
        </View>

        <FlatList
          style={Styles.flatlist}
          data={listas}
          keyExtractor={(item) => String(item.codigo)}
          renderItem={({ item }) => (
            <Lista
              key={item.codigo}
              titulo1={item.nomeLista}
              questoes={item.questoes}
              finalizado={item.finalizado}
              onBotaoPress={() => carregarItemId(item.codigo, item.finalizado)}
              onPressOne={() => carregarLista(item.codigo)}
            />
          )}
        />
      </View>
    </LinearGradient>
  );
}
