import React, { useState } from "react"; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export const ResultadoAlunos = () => {
  const alunos = [
    { nome: "Aluno 1", acertos: 5, tentativas: 3, status: "Completo" },
    { nome: "Aluno 2", acertos: 0, tentativas: 2, status: "Incompleto" },
    { nome: "Aluno 3", acertos: 3, tentativas: 1, status: "Parcial" },
  ];

  const [informacoes, setInformacoes] = useState([]);
  const handleButtonPress = (aluno) => { 
    setInformacoes((prev) =>
      prev.includes(aluno) ? prev.filter(item => item !== aluno) : [...prev, aluno]
    );
  };

  return (
    <View style={styles.resultadoAlunos}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {alunos.map((aluno, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.text}>Aluno: {aluno.nome}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(aluno.nome)}>
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>
            {informacoes.includes(aluno.nome) && (
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Acertos: {aluno.acertos}</Text>
                <Text style={styles.infoText}>Tentativas: {aluno.tentativas}</Text>
                <Text style={styles.infoText}>Status: {aluno.status}</Text>
                <TouchableOpacity style={styles.verQuestaoButton}>
                  <Text style={styles.verQuestaoText}>Ver questão</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  resultadoAlunos: {
    flex: 1,
    backgroundColor: "#d6c4f7",
    padding: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f54f59",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    maxWidth: 400,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#ffffff",
    fontFamily: "Inder-Regular",
    fontSize: 14,
    flex: 1,
  },
  button: {
    backgroundColor: "#ffb8bc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Inter-Regular",
    fontSize: 14,
    fontWeight: "400",
  },
  infoContainer: {
    backgroundColor: "#ffb8bc",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    width: "100%", 
  },
  infoText: {
    color: "#ffffff", 
    fontFamily: "Inder-Regular",
    fontSize: 14, 
    marginBottom: 10,
  },
  verQuestaoButton: {
    backgroundColor: "#f54f59",
    borderRadius: 5,
    marginTop: 15, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "stretch",
  },
  verQuestaoText: {
    color: "#ffffff", 
    fontFamily: "Inder-Regular",
    fontSize: 14, 
    textAlign: "center",
  },
});

export default ResultadoAlunos;