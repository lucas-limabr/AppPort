import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { View, TouchableOpacity, Text, Modal, TextInput, FlatList, ScrollView } from "react-native";
import Styles from "../Styles.js/StylesMenuAluno";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { Firestore, doc, getFirestore, getId, where } from "firebase/firestore";
import { addDoc, collection, query, getDocs } from "firebase/firestore";

export default function MenuAluno() {
  const db = getFirestore(FIREBASE_APP);
  const auth = FIREBASE_AUTH;
  const [visible, setVisible] = useState(false);
  const [listas, setListas] = useState([])
  
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
        
        
      })
      
    }catch(error) {
      console.error(error)
    }
  }

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

  function ClickButton({ title, acertos, erros, num3 }) {
    //Função que cria o botão

    return (
      <TouchableOpacity style={Styles.buttom}>
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
          <ClickButton key={item.codigo} title={item.nomeLista} acertos={item.acertos} erros={item.erros} /> 
        )}
        />
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}
