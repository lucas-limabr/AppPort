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
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, query, getDocs } from "firebase/firestore";

export default function Listas() {
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const collectionRef = collection(db, "listas");

  const [visible, setVisible] = useState(false);

  const [listas, setListas] = useState([]);

  const criador = auth.currentUser.uid;

  useEffect(() => {
    async function carregarListas() {
      const listasDoFirestore = await buscarListasDoFirestore();
      setListas(listasDoFirestore);
    }

    carregarListas();
  }, []);

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
    const novaLista = {
      criador,
      nomeLista,
      idQuestao: [],
    };

    const listaCriada = await addDoc(collectionRef, novaLista);

    setListas([...listas, novaLista]);

    setVisible(false);
    Alert.alert("Lista criado com sucesso");
    setNomeLista("");
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

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <ModalLista />

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

        <FlatList style={Styles.flatlist}
          data={listas}
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
            <Lista key={item.id} titulo1={item.nomeLista} />
          )}
        />
      </View>
    </LinearGradient>
  );
}
