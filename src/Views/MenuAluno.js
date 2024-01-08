import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { View, TouchableOpacity, Text, Modal, TextInput } from "react-native";
import Styles from "../Styles.js/StylesMenuAluno";

export default function MenuAluno() {
  const [visible, setVisible] = useState(false);

  const ModalList = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={Styles.containerModal}>
          <View style={Styles.viewInput}>
            <View style={Styles.titleInputStyle}>
              <Text style={Styles.titleInputStyleFont}>
                Informe o código da lista
              </Text>
            </View>

            <TextInput style={Styles.inputStyle}></TextInput>

            <View style={Styles.buttomContent}>
              <TouchableOpacity style={Styles.buttomContentButtom} onPress={() => setVisible(false)}>
                <Text style={Styles.buttomContentText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={Styles.buttomContentButtom}>
                <Text style={Styles.buttomContentText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  function ClickButton({ title, num1, num2, num3 }) {
    //Função que cria o botão

    return (
      <TouchableOpacity style={Styles.buttom}>
        <View style={Styles.titleStyle}>
          <Text style={Styles.titleStyleFont}>{title}</Text>
        </View>
        <View>
          <Text style={Styles.styleFontContent}>Acertos: {num1}</Text>

          <Text style={Styles.styleFontContent}>Erros: {num2}</Text>

          <Text style={Styles.styleFontContent}>{num3}% completa</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // function Button({ title, num1, num2, num3 }) {
  //     return (

  //             <ClickButton title={title} num1={num1} num2={num2} num3={num3}/>

  //     )
  // }

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
        <ClickButton title="Lista 1" num1="2" num2="1" num3="100" />
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}
