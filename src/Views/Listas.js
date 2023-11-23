import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Styles.js/StylesLista";
import style from "../Styles.js/StylesModalLista";
import Lista from "../Componentes/ComponentLista";
import { AntDesign } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getFirestore, getId } from "firebase/firestore";
import { addDoc, collection, query, getDocs } from "firebase/firestore";

import { nanoid } from "nanoid";
import "react-native-get-random-values";

export default function Listas() {
  const [atualizarDados, setAtualizarDados] = useState();
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const collectionRef = collection(db, "listas");

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false)


  const [listas, setListas] = useState([]);

  const criador = auth.currentUser.uid;
  const referenciaCriador = doc(db, "users", criador);

  const codigo = nanoid(6);

  async function buscarListasDoFirestore() {
    const listasCollection = collection(db, "listas");
    const listasQuery = query(listasCollection);

    const listasSnapshot = await getDocs(listasQuery);

    const listas = [];

    listasSnapshot.forEach((doc) => {
      const listaData = doc.data();
      listas.push(listaData);
    });

    return listas;
  }

  async function criarLista(nomeLista) {
    setAtualizarDados(!atualizarDados);
    setVisible(false);

    const novaLista = {
      criador: referenciaCriador,
      codigo: codigo,
      nomeLista,
      questoes: [],
    };

    console.log(novaLista);
    const listaCriada = await addDoc(collectionRef, novaLista);
    const listaId = docRef.id;

    setListas([...listas, { ...listas, novaLista }]);
    Alert.alert("Lista criado com sucesso");
  }

  useEffect(() => {
    async function carregarListas() {
      const listasDoFirestore = await buscarListasDoFirestore();
      setListas(listasDoFirestore);
    }

    carregarListas();
  }, [atualizarDados]);

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
              <TouchableOpacity style={style.botaoEditar}>
                <Text style={style.txtEditar}>Adicionar/Remover questões</Text>
              </TouchableOpacity >
              <TouchableOpacity style={style.botaoEditar}>
                <Text style={style.txtEditar}>Duplicar</Text>
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

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <ModalLista />
      <ModalEditar />

      <View style={Styles.container}>
        <View style={Styles.containerBusca}>
          <TextInput style={Styles.textInput}></TextInput>
        </View>

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Lista key={item.id} titulo1={item.nomeLista} onBotaoPress={()=>setVisibleEdit(true)}  />
          )}
        />
      </View>
    </LinearGradient>
  );
}
