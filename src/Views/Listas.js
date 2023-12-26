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
// import Lista from "../Componentes/ComponentLista";
import { AntDesign } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getFirestore, getId, where } from "firebase/firestore";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons, FontAwesome5  } from '@expo/vector-icons';

import {fetchIdList, deleteList} from '../FuncoesFirebase/Funcoes'

import { nanoid } from "nanoid";
import "react-native-get-random-values";

import { userReference } from "../FuncoesFirebase/Funcoes";




export default function Listas() {
  const [atualizarDados, setAtualizarDados] = useState();
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

  const [forceRender, setForceRender] = useState(false);

  const copy = `# h1 Heading 8-) \n ## ola a todos \n ## _italico_ \n *negrito*`

  const codigo = nanoid(6);

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
    setAtualizarDados(!atualizarDados);
    setVisible(false);

    const novaLista = {
      criador: referenciaCriador,
      codigo: codigo,
      nomeLista,
      questoes: [],
    };

    
    const listaCriada = await addDoc(collectionRef, novaLista);
    const listaId = docRef.id;

    setListas([...listas, { ...listas, novaLista }]);
    Alert.alert("Lista criado com sucesso");
  }

  const carregarItemId = (id) => {
    setVisibleEdit(true)
    setItemId(id)
  }

  useEffect(() => {
    async function carregarListas() {
      const listasDoFirestore = await buscarListasDoFirestore();
      setListas(listasDoFirestore);
     
    }
    
    carregarListas();
  }, [atualizarDados]);

  const BotaoLista = ({ titulo, onBotaoPress  }) => {
  
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
  
    const fetchId = async () =>{
      const id = await fetchIdList('nomeLista', 'listas', titulo)
  
      return id;
    }
  
    
  
    const handleDelete = async () => {
      const codigoListaParaExcluir = await fetchId();
      
      await deleteList(codigoListaParaExcluir);
      
      setAtualizarDados(!atualizarDados)

      console.log(atualizarDados)
     
      
  
    }
    
    return(
    
    <TouchableOpacity style={Styles.lista} >
      <View style={Styles.containerBotao}>
        <TouchableOpacity style={{ marginLeft: 5, marginTop: 0}} onPress={handleBotaoPress}>
        <FontAwesome5  name="ellipsis-h" size={20} color="#fff" />
        </TouchableOpacity>
  
        <TouchableOpacity style={{backgroundColor:'#F54F59'}} onPress={handleDelete}>
        <EvilIcons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={Styles.txt}>
        <Text style={Styles.txtLista}> {titulo} </Text>
  
      </View>
    </TouchableOpacity>
  );}

  function Lista({ titulo1, onBotaoPress}) {
  
    return (
    <View style = {Styles.containerFilho}>
        <BotaoLista titulo={titulo1} onBotaoPress={onBotaoPress}   />
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
              <TouchableOpacity style={style.botaoEditar} onPress={() => {navigation.navigate('StackNav', { screen: 'Menu', params: {itemId } }); setVisibleEdit(false)}}>
                <Text style={style.txtEditar}>Adicionar/Remover questões</Text>
              </TouchableOpacity >
              <TouchableOpacity style={style.botaoEditar} onPress={() => setVisibleCodigo(true)}>
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
              <TouchableOpacity style={style.botaoEditar} onPress={() => {setVisibleCodigo(false); setVisibleEdit(false)}} >
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
      <ModalCodigo/>

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
              <Lista key={item.codigo} titulo1={item.nomeLista} onBotaoPress={() => carregarItemId(item.codigo)} />
            )}
        />
        
        {/* <Markdown>{copy}</Markdown> */}
        
      </View>
    </LinearGradient>
  );
}
