import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, Alert, FlatList, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLista";
import style from "../Styles.js/StylesModalLista";
// import Lista from "../Componentes/ComponentLista";
import { AntDesign } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getFirestore, getId, where } from "firebase/firestore";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';

import { useFocusEffect } from "@react-navigation/native";

import { fetchIdList, deleteList, fetchQuestionIdByTitle } from '../FuncoesFirebase/Funcoes'

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
  const [visibleExcluir, setVisibleExcluir] = useState(false)
  const [visibleCodigo, setVisibleCodigo] = useState(false)
  const [itemId, setItemId] = useState('')

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

  async function criarLista(nomeLista) {

    setVisible(false);

    const novaLista = {
      criador: referenciaCriador,
      codigo: codigo,
      nomeLista,
      questoes: [],
    };


    const listaCriada = await addDoc(collectionRef, novaLista);

    setListas([...listas, { ...listas, novaLista }]);
    setAtualizarDados(!atualizarDados);
    Alert.alert("Lista criada com sucesso");
  }

  const carregarItemId = (id) => {
    setVisibleEdit(true)
    setItemId(id)

  }

  const carregarLista = (id) => {
    setItemId(id)
    navigation.navigate('StackNav', { screen: 'QuestoesLista', params: { itemId: id } })
  }

  async function carregarListas() {
    const listasDoFirestore = await buscarListasDoFirestore();
    setListas(listasDoFirestore);
  }

  useEffect(() => {
    carregarListas();  // Recarrega quando atualizarDados mudar
  }, [atualizarDados]);

  //useFocusEffect smp será executado quando a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      carregarListas();  // Recarrega quando a tela ganha foco
    }, [])
  );

  const BotaoLista = ({ titulo, onBotaoPress, onPressOne }) => {

    const handleBotaoPress = async () => {
      onBotaoPress();

      try {
        const id = await fetchId();
        // console.log(id);
        return id;
      } catch (error) {
        // Lide com erros aqui, se necessário
        console.error('Erro ao obter ID:', error);
      }
    };


    const handleListNavigation = async () => {
      onPressOne();

      try {
        const id = await fetchId();
        console.log(id);
        return id;
      } catch (error) {
        // Lide com erros aqui, se necessário
        console.error('Erro ao obter ID:', error);
      }
    };

    const fetchId = async () => {
      const id = await fetchQuestionIdByTitle('nomeLista', 'listas', referenciaCriador)

      console.log("id " + id)

      console.log(titulo)

      return id;
    }



    const handleDelete = async () => {


      // console.log(referenciaCriador.id)

      await deleteList(titulo, referenciaCriador.id);

      setAtualizarDados(!atualizarDados)
    }

    return (

      <TouchableOpacity style={Styles.lista} onPress={handleListNavigation}>
        <View style={Styles.containerBotao}>
          <TouchableOpacity style={{ marginLeft: 5, marginTop: 0 }} onPress={(handleBotaoPress)}>
            <FontAwesome5 name="ellipsis-h" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: '#F54F59' }} onPress={handleDelete}>
            <EvilIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={Styles.txt}>
          <Text style={Styles.txtLista}> {titulo} </Text>

        </View>
      </TouchableOpacity>
    );
  }

  function Lista({ titulo1, onBotaoPress, onPressOne }) {

    return (
      <View style={Styles.containerFilho}>
        <BotaoLista titulo={titulo1} onBotaoPress={onBotaoPress} onPressOne={onPressOne} />
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
    return (
      <Modal animationType="slide" transparent={true} visible={visibleEdit}>
        <View style={style.container}>
          <View style={style.boxGeral}>
            <View style={{ alignItems: "center" }}>

              <View style={{ justifyContent: "center", height: 185 }}>
                <TouchableOpacity style={style.botaoEditar} onPress={() => { navigation.navigate('StackNav', { screen: 'Menu', params: { itemId } }); setVisibleEdit(false) }}>
                  <Text style={style.txtEditar}>Adicionar/Remover questões</Text>
                </TouchableOpacity >
                <TouchableOpacity style={style.botaoEditar} onPress={() => { setVisibleEdit(false); setVisibleCodigo(true) }}>
                  <Text style={style.txtEditar}>Exibir código</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.botaoEditar} onPress={() => setVisibleEdit(false)}>
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
        {/* <View style={Styles.containerBusca}>
          <TextInput style={Styles.textInput}></TextInput>
        </View> */}

        <View style={Styles.containerList}>
          <TouchableOpacity
            style={Styles.addLista}
            onPress={() => setVisible(true)}
          >
            <AntDesign name="plus" size={50} color="#F54F59" />
          </TouchableOpacity>
        </View>

        <FlatList
          style={Styles.flatlist}
          data={listas}
          keyExtractor={(item) => item.codigo}
          renderItem={({ item }) => (
            <Lista key={item.codigo} titulo1={item.nomeLista} onBotaoPress={() => carregarItemId(item.codigo)} onPressOne={() => carregarLista(item.codigo)} />
          )}
        />

        {/* <Markdown>{copy}</Markdown> */}

      </View>
    </LinearGradient>
  );
}
