import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";
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
  const navigation = useNavigation();

  const userId = auth.currentUser.uid;

  const [fases, setFases] = useState([]);
  const [fasesAbertas, setFasesAbertas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fasesPerPage = 3;

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
      <TouchableOpacity
        style={Styles.boxImageButton}
        onPress={() =>
          navigation.navigate("QuestoesTrilha", {
            screen: "QuestoesTrilha",
            params: { info: info, userId: userId },
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

  const orderedFases = fases.sort(
    (a, b) => parseInt(a.fase) - parseInt(b.fase)
  );

  const totalPages = Math.ceil(orderedFases.length / fasesPerPage);
  const startIndex = currentPage * fasesPerPage;
  const currentFases = orderedFases.slice(startIndex, startIndex + fasesPerPage);

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
        {currentFases.map((fase, index) => {
          const { id, concluido } = fase;

          const allPreviousCompleted = orderedFases
            .slice(0, startIndex + index)
            .every((prevFase) => prevFase.concluido);

          const faseLiberada = index === 0 ? allPreviousCompleted : orderedFases[startIndex + index - 1].concluido;

          const getRandonPosition = () => {
            const randomNum = Math.floor(Math.random() * 3);
            switch (randomNum) {
              case 0:
                return Styles.AjustItens_left;
              case 1:
                return Styles.AjustItens_center;
              default:
                return Styles.AjustItens_right;
            }
          };

          let style = getRandonPosition();

          return (
            <View style={Styles.box} key={id}>
              <View style={style}>
                <View style={Styles.boxImage}>
                  {faseLiberada ? (
                    <FreeFased txt={fase.fase} info={fase} />
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
