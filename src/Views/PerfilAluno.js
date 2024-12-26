import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "../Styles.js/StylesPerfilAluno";
import { getInfoUser } from "../FuncoesFirebase/Funcoes";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { format, differenceInCalendarDays } from "date-fns";

import { updateSequenceDays } from "../FuncoesFirebase/Funcoes";
import { doc, updateDoc } from "firebase/firestore"; // Importar a função updateDoc
import { getFirestore } from "firebase/firestore"; // Importar o Firestore


export default function PerfilAluno() {
  const [user, setUser] = useState(null);
  const [sequenciaDias, setSequenciaDias] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = FIREBASE_AUTH;

      // Ouve as mudanças de autenticação
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          // Obtém os detalhes do usuário no Firestore
          const userInfo = await getInfoUser(currentUser.email);
          if (userInfo) {
            setUser(userInfo);
            setSequenciaDias(userInfo.sequenciaDias || 0); // Atualiza sequência de dias

            // Atualiza a sequência de dias
            try {
              await updateSequenceDays(currentUser.email);
            } catch (error) {
              console.error("Erro ao atualizar sequência de dias:", error);
            }

          } else {
            console.error("Usuário não encontrado no Firestore.");
          }
        } else {
          setUser(null); // Nenhum usuário logado
        }
      });

      return () => unsubscribe(); // Limpa o listener ao desmontar
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const auth = FIREBASE_AUTH;
      const db = getFirestore(FIREBASE_APP); // Referência ao Firestore

      console.log("UID do usuário:", user.userId);

      // Criar referência ao documento
      const userRef = doc(db, "users", user.userId);

      // Atualiza os dados do usuário no Firestore
      await updateDoc(userRef, {
        sequenciaDias: 0, // Zera a sequência de dias
        ultimoAcesso: null, // Define ultimoAcesso como null
      });

      // Realiza o logout
      await auth.signOut();
      console.log("Logout realizado com sucesso.");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };



  return (
    <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={Styles.gradient}>
      <View style={Styles.container}>
        <View style={Styles.backgroundUser}>
          <Image
            style={Styles.image}
            source={require("../Imagens/portuguita_profile.jpg")}
          />
        </View>

        <TouchableOpacity
          style={[Styles.botao, Styles.sombra]}
          onPress={() => logout()}
        >
          <Text style={Styles.txtBotao}>Sair</Text>
        </TouchableOpacity>

        <View style={Styles.containerFilho}>
          <View style={Styles.viewOptions}>
            <Text style={Styles.txtInput}>Nome: {user ? user.nome : ""}</Text>
          </View>
        </View>

        <View style={Styles.containerFilho}>
          <View style={Styles.containerSonAux}>
            <View style={Styles.containerSonAuxFlexbox}>
              <View style={Styles.ViewDados}>
                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Sequência</Text>
                </View>

                <View style={Styles.numberDays}>
                  <Text style={Styles.txtnumberDays}>{sequenciaDias}</Text>
                </View>

                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Dias</Text>
                </View>
              </View>

              <View style={Styles.ViewDados}>
                <View style={Styles.titleView}>
                  <Text style={Styles.txtTitleView}>Desde</Text>
                </View>

                <View style={Styles.numberDays}>
                  <Text style={Styles.txtDate}>
                    {user ? format(user.dataCadastro.toDate(), "dd/MM/yy") : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={Styles.containerFilho}>
          <View style={[Styles.viewOptions, Styles.campoEmail]}>
            <Text style={Styles.txtInput}>E-mail: {user ? user.email : ""}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
