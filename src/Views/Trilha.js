import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Styles from "../Styles.js/StyleTrilha.js";
import { useRoute } from "@react-navigation/native";
import { getDocs, collection, doc, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

export default function Trilha() {
  const route = useRoute();
  const subTema = route.params.params;
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation()
  const [idFase,setIdFase] = useState()

  const userId = auth.currentUser.uid;
  

  const [fases, setFases] = useState([]);
  const [fasesAbertas, setFasesAbertas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      
      const fetchData = async () => {
        try {
          const db = getFirestore(FIREBASE_APP);
          const userDocRef = doc(db, "users", userId); 
          const fasesCollectionRef = collection(userDocRef, "userFases");
          const subtemaQuery = query(
            fasesCollectionRef,
            where("subTema", "==", subTema)
          );
          const querySnapshot = await getDocs(subtemaQuery);
          const fasesData = querySnapshot.docs.map((doc) => doc.data());
          setFases(fasesData);
          
         
        } catch (error) {
          console.error("Error fetching fases:", error);
        }
      };

      fetchData();
    }, [userId, subTema]) 
  );

  useEffect(() => {
    // Define quais fases estão abertas com base nas fases concluídas
    const fasesAbertas = fases.reduce((acc, fase, index) => {
      if (index === 0 || fases[index - 1].concluido) {
        return [...acc, index];
      } else {
        return acc;
      }
    }, []);

    setFasesAbertas(fasesAbertas);
    
  }, [fases]);

  const FreeFased = ({ txt, info }) => {
    

    return (
      <TouchableOpacity style={Styles.boxImageButton} onPress={() => navigation.navigate("QuestoesTrilha", {screen: "QuestoesTrilha", params : {info: info, userId: userId}})}>
        <Image
          source={require("../Imagens/icone_13.png")}
          style={Styles.boxImageImage}
        />
        <Text style={Styles.boxImageButtonText}>{txt}</Text>
      </TouchableOpacity>
    );
  };

  const ClosedFased = ({ txt }) => {
    return (
      <TouchableOpacity style={Styles.boxImageButton} activeOpacity={1}>
        <Image
          source={require("../Imagens/icone_14.png")}
          style={Styles.boxImageImage}
        />
        <Text style={Styles.boxImageButtonText}>{txt}</Text>
      </TouchableOpacity>
    );
  };

  const orderedFases = fases.sort((a, b) => parseInt(a.fase) - parseInt(b.fase));

  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/Trilha_Atividades1.png")}
    >
      <StatusBar style="auto" />
      <View style={Styles.divTela}>
        {orderedFases.map((fase, index) => {
          const { id, concluido } = fase;
          const faseAnteriorConcluida = index === 0 ? true : fases[index - 1].concluido;
  
          
          let style;

          if(subTema ==="usoDosPorques" || subTema =="pronomes" || subTema === "pontuacao" || subTema === "regencia"){
            switch (index) {
              case 0:
                style = Styles.AjustItens_right;
                break;
  
              case 1:
                style = Styles.AjustItens_left;
                break;
  
              case 2:
                style = Styles.AjustItens_right;
                break;
  
  
              default:
                style = Styles.AjustItens_center;
                break;
            }
          }
          if(subTema ==="acentuacao" || subTema =="silabas"){
            switch (index) {
              case 0:
                style = Styles.AjustItens_right;
                break;
  
              case 1:
                style = Styles.AjustItens_left;
                break;
  
              case 2:
                style = Styles.AjustItens_left;
                break;
  
              case 3:
                style = Styles.AjustItens_right;
                break;
                
              default:
                style = Styles.AjustItens_center;
                break;
            }
          }
          if(subTema ==="flexoesVerbais"){
            switch (index) {
              case 0:
                style = Styles.AjustItens_center;
                break;
  
              case 1:
                style = Styles.AjustItens_center;
                break;
  
              case 2:
                style = Styles.AjustItens_left;
                break;
  
              case 3:
                style = Styles.AjustItens_center;
                break;
                
              case 4:
                style = Styles.AjustItens_center;
                break;
  
              default:
                style = Styles.AjustItens_center;
                break;
            }
          }
          if(subTema ==="concordancia" || subTema =="conjuncoes" || subTema === "classesGramaticais" || subTema === "preposicoes" || subTema === "vozesVerbais"  || subTema === "expressoesCotidianas" ||  subTema === "crase"){
            switch (index) {
              case 0:
                style = Styles.AjustItens_right;
                break;
  
              case 1:
                style = Styles.AjustItens_right;
                break;
  
              default:
                style = Styles.AjustItens_right;
                break;
            }
          }
            
          return (
            <View style={Styles.box}>
              <View style={style}>
                <View style={Styles.boxImage}>
                  {faseAnteriorConcluida ? (
                    <FreeFased key={id} txt={fase.fase} info={fase}/>
                    ) : (
                      <ClosedFased key={id} txt={fase.fase} info={fase}/>
                      )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ImageBackground>
  );
}
