import React from "react";  
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export const EstatisticasQuestoes = () => { 
  const questoes = [
    {
      id: 1,
      erros: 2,
      acertos: 3,
    },
    {
      id: 2,
      erros: 0,
      acertos: 5,
    },
    {
      id: 3,
      erros: 5,
      acertos: 0,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.content}>
          {[1, 2, 3].map((grupo, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Questão:</Text>
                <Text style={[styles.headerText, styles.errorsHeader]}>Número de erros</Text>
                <Text style={[styles.headerText, styles.acertosHeader]}>Acertos</Text>
              </View>
              <View style={styles.body}>
                {questoes.map((questao) => (
                  <View key={questao.id} style={styles.bodyRow}>
                    <Text style={styles.bodyText}>Questão {questao.id}</Text>
                    <Text style={[styles.bodyText, styles.errorsBody]}>{questao.erros}</Text>
                    <Text style={[styles.bodyText, styles.acertosBody]}>{questao.acertos}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ver questões</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(210, 208, 250, 1)", 
    paddingVertical: 20, 
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(210, 208, 250, 1)", 
    alignItems: "center",
    justifyContent: "center", 
  },
  content: {
    width: 378,
    backgroundColor: "rgba(210, 208, 250, 1)", 
    paddingVertical: 20,
    borderRadius: 10,
  },
  card: {
    width: 329,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(210, 208, 250, 1)", 
  },
  header: {
    backgroundColor: "#f54f59",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Inder-Regular",
  },
  errorsHeader: {
    marginLeft: 40, 
  },
  acertosHeader: {
    marginLeft: 40, 
  },
  body: {
    backgroundColor: "#ffb8bc", 
    padding: 10,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
  },
  bodyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  bodyText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "Inder-Regular",
  },
  errorsBody: {
    marginLeft: 40, 
  },
  acertosBody: {
    marginLeft: 40, 
    marginRight: 15,
  },
  button: {
    backgroundColor: "#f54f59",
    borderRadius: 10, 
    padding: 10,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "Inder-Regular",
  },
});

export default EstatisticasQuestoes;
