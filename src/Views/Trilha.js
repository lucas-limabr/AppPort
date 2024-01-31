import React from "react";
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

export default function Trilha() {
  const route = useRoute();
  const subTema = route.params.params;
  

  const FreeFased = ({ txt }) => {
    return (
      <TouchableOpacity style={Styles.boxImageButton}>
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
      <TouchableOpacity style={Styles.boxImageButton}>
        <Image
          source={require("../Imagens/icone_14.png")}
          style={Styles.boxImageImage}
        />
        <Text style={Styles.boxImageButtonText}>{txt}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      style={Styles.imageAjust}
      source={require("../Imagens/Trilha_Atividades1.png")}
    >
      <StatusBar style="auto" />

      <View style={Styles.divTela}>
        <View style={Styles.box}>
          <View style={Styles.AjustItens_right}>
            <View style={Styles.boxImage}>
              <ClosedFased txt={"5"} />
            </View>
          </View>
        </View>

        <View style={Styles.box}>
          <View style={Styles.AjustItens_center}>
            <View style={Styles.boxImage}>
              <ClosedFased txt={"4"} />
            </View>
          </View>
        </View>

        <View style={Styles.box}>
          <View style={Styles.AjustItens_left}>
            <View style={Styles.boxImage}>
              <ClosedFased txt={"3"} />
            </View>
          </View>
        </View>

        <View style={Styles.box}>
          <View style={Styles.AjustItens_right}>
            <View style={Styles.boxImage}>
              <FreeFased txt={"2"} />
            </View>
          </View>
        </View>

        <View style={Styles.box}>
          <View style={Styles.AjustItens_center}>
            <View style={Styles.boxImage}>
              <FreeFased txt={"1"} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
