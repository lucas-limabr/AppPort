import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import Styles from "../Styles.js/StyleTrilha.js";
import { useRoute } from "@react-navigation/native";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

export default function Trilha() {
  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);
  const route = useRoute();
  const navigation = useNavigation();

  const subTema = route.params.params;

  const userId = auth.currentUser.uid;

  const [fases, setFases] = useState([]);
  const [currentFases, setCurrentFases] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastCompletedFase, setLastCompletedFase] = useState(1);
  const [subTemaDoc, setSubTemaDoc] = useState(null);

  const fasesPerPage = 3;

  const totalPages = Math.ceil(fases.length / fasesPerPage);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const questoesCollectionRef = collection(db, "questoesAluno");

          const subtemaQuery = query(
            questoesCollectionRef,
            where("subTema", "==", subTema)
          );
          const querySnapshot = await getDocs(subtemaQuery);

          const fasesData = querySnapshot.docs
            .map((doc) => doc.data())
            .reduce((acc, questao) => {
              const fase = parseInt(questao.fase);
              if (!acc[fase]) {
                acc[fase] = { fase, questoes: [] };
              }
              acc[fase].questoes.push(questao);
              return acc;
            }, {});

          const orderedFases = Object.values(fasesData).sort((a, b) => a.fase - b.fase);

          setFases(orderedFases);
        } catch (error) {
          console.error("Error fetching fases:", error);
        }
      };

      fetchData();
    }, [subTema])
  );

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "users", userId);

      const trilhaInfoCollectionRef = collection(userRef, "trilhaInfo");

      const subtemaQuery = query(trilhaInfoCollectionRef, where("subtema", "==", subTema));
      const querySnapshot = await getDocs(subtemaQuery);

      const subTemaDoc = querySnapshot.docs[0];
      setSubTemaDoc(subTemaDoc);

      setLastCompletedFase(subTemaDoc.data().ultimaFaseConcluida);
    }

    fetchData();
  }, [fases]);

  useEffect(() => {
    const startIndex = currentPage * fasesPerPage;
    setCurrentFases(fases.slice(startIndex, startIndex + fasesPerPage));
  }, [fases, currentPage]);

  const FreeFased = ({ txt, info }) => {
    return (
      <TouchableOpacity
        style={Styles.boxImageButton}
        onPress={() =>
          navigation.navigate("QuestoesTrilha", {
            screen: "QuestoesTrilha",
            params: { info: info, userId: userId , subTemaDoc: subTemaDoc},
          })
        }
      >
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

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/Trilha_Atividades1.png")}
    >
      <StatusBar style="auto" />

      {currentPage > 0 && (
        <View style={Styles.topButtonContainer}>
          <TouchableOpacity style={Styles.paginationButton} onPress={goToPreviousPage}>
            <Ionicons name="arrow-up" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
      )}

      <View style={Styles.divTela}>
        {
          currentFases.map((fase, index) => {
            const absoluteFaseIndex = index + currentPage * fasesPerPage;

            const getPositionFase = () => {
              const totalPageFases = currentFases.length;

              if (totalPageFases === 1) {
                return Styles.AjustItens_center;
              } else if (totalPageFases === 2) {
                return index === 0 ? Styles.AjustItens_2Fases_high : Styles.AjustItens_2Fases_low;
              } else if (totalPageFases === 3) {
                switch (index) {
                  case 0:
                    return Styles.AjustItens_high;
                  case 1:
                    return Styles.AjustItens_center;
                  case 2:
                    return Styles.AjustItens_low;
                  default:
                    return Styles.AjustItens_center;
                }
              }
            };

            let style = getPositionFase();

            return (
              <View style={Styles.box}>
                <View style={style}>
                  <View style={Styles.boxImage}>
                    {absoluteFaseIndex < lastCompletedFase + 1 ? (
                      <FreeFased txt={fase.fase} info={fase.questoes} />
                    ) : (
                      <ClosedFased txt={fase.fase} />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
      </View>

      {currentPage < totalPages - 1 && (
        <View style={Styles.bottomButtonContainer}>
          <TouchableOpacity style={Styles.paginationButton} onPress={goToNextPage}>
            <Ionicons name="arrow-down" style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}
