import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { View, TouchableOpacity, Text, Modal, TextInput, FlatList, ScrollView } from "react-native";
import Styles from "../Styles.js/StylesMenuAluno";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import {  doc, getFirestore, getId, where } from "firebase/firestore";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { userReference } from "../FuncoesFirebase/Funcoes";
import { useNavigation } from "@react-navigation/native";
import { fetchIdList } from "../FuncoesFirebase/Funcoes";


export default function MenuAluno() {
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const [visible, setVisible] = useState(false);
  const [listas, setListas] = useState([])
  const [atualizarDados, setAtualizarDados] = useState()
  const [id, setId] = useState('')
  const navigation = useNavigation()
  
  const aluno = auth.currentUser.uid
  const referenceAluno = doc(db, 'users', aluno)

  const searchList = async (codigo) => {
      try {
      const listProfessor = collection(getFirestore(), 'listas')
      const listQuery = query(listProfessor, where("codigo", "==", codigo))

      const listSnapshot = await getDocs(listQuery)
      
      listSnapshot.forEach(async(doc) => {
        const listData = doc.data();

        const newList = {
          ...listData,
          aluno: referenceAluno,
          respostaAluno: [],
          acertos: 0,
          erros: 0
        }
        const listAluno = collection(getFirestore(), "ListaAluno")
        await addDoc(listAluno, newList)
        setListas((prevListas) => [...prevListas, listData]);
        setVisible(false)
        setAtualizarDados(!atualizarDados)
        
        
      })
      
    }catch(error) {
      console.error(error)
    }
  }
  async function buscarListasDoFirestore() {
    try {
    const usuarioLogadoReference = await userReference();

    const listasCollection = collection(getFirestore(), "ListaAluno");
    const listasQuery = query(listasCollection, where("aluno", "==", usuarioLogadoReference));

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

  const navegarLista = (id) => {
    setId(id)
    navigation.navigate('StackNavAluno', {screen: 'QuestoesAluno', params: {itemId: id} })
  }

  useEffect(() => {
    async function carregarListas() {
      const listasDoFirestore = await buscarListasDoFirestore ();
      setListas(listasDoFirestore)
    }

    carregarListas()
  },[atualizarDados] )

  const ModalList = () => {
    const [codigo, setCodigo] = useState('')
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={Styles.containerModal}>
          <View style={Styles.viewInput}>
            <View style={Styles.titleInputStyle}>
              <Text style={Styles.titleInputStyleFont}>
                Informe o código da lista
              </Text>
            </View>

            <TextInput style={Styles.inputStyle} onChangeText={(text) => setCodigo(text)}></TextInput>

            <View style={Styles.buttomContent}>
              <TouchableOpacity style={Styles.buttomContentButtom} onPress={() => setVisible(false)}>
                <Text style={Styles.buttomContentText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={Styles.buttomContentButtom} onPress={() => searchList(codigo)}>
                <Text style={Styles.buttomContentText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  function ClickButton({ title, acertos, erros, num3, onButtonPress }) {
    //Função que cria o botão

    const handleListNavigation = async () => {
      onButtonPress();

      try{
        const id = await fetchId()
        console.log(id)
        return id;
        }catch(error){
          console.log("Erro ao obter ID:", error)
        }
    }

    const fetchId = async () => {
      const id = await fetchIdList('nomeLista', 'ListaAluno', title)

      return id
    }


    return (
      <TouchableOpacity style={Styles.buttom} onPress={handleListNavigation}>
        <View style={Styles.titleStyle}>
          <Text style={Styles.titleStyleFont}>{title}</Text>
        </View>
        <View>
          <Text style={Styles.styleFontContent}>Acertos: {acertos}</Text>

          <Text style={Styles.styleFontContent}>Erros: {erros}</Text>

          <Text style={Styles.styleFontContent}>{num3}% completa</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function ClickButton1({ title }) {
    return (
      <TouchableOpacity
        style={Styles.ButtomAddList}
        onPress={() => setVisible(true)}
      >
        <View>
          <Text style={Styles.ButtomAddListText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function ButtonAdd({ title }) {
    return (
      <View>
        <ClickButton1 title={title} />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <ModalList />
      <View style={Styles.containerTitle}>
        <ButtonAdd title="+" />
      </View>

      <View style={Styles.container}>
        <FlatList
        
        data={listas}
        keyExtractor={(item) => item.codigo}
        renderItem={({item}) => (
          <ClickButton key={item.codigo} title={item.nomeLista} acertos={item.acertos} erros={item.erros} onButtonPress={() => navegarLista(item.codigo) } /> 
        )}
        />
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}
