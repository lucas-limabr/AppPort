import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    flex: 1, // Preenche toda a tela
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // Espaçamento uniforme vertical
    alignItems: "flex-end", // Centraliza horizontalmente
    paddingVertical: 20,
  },
  imageNome: {
    width: 400, // Ajuste conforme necessário
    height: 400, // Ajuste conforme necessário
    resizeMode: "contain", // Preserva a proporção da imagem
    marginTop: 20,
  },
  containerFilho: {
    width: "100%", // Garante que ocupe toda a largura do pai
    alignItems: "flex-end", // Centraliza os botões horizontalmente
    marginBottom: 20, // Ajuste o espaçamento entre o botão Login e os outros elementos
  },
  botaoContainer: {
    width: "100%", // Garante que ocupe toda a largura
    alignItems: "flex-end", // Centraliza os botões horizontalmente
    gap: 8, // Controla o espaçamento entre Login e Cadastrar
  },
  botaoGrande: {
    backgroundColor: "#FFB9BD", 
    paddingVertical: 15, // Altura do botão
    borderRadius: 25,
    alignItems: "center",
    width: "80%",
    marginBottom: 15, // Diminui o espaçamento entre os botões
    marginRight: 40,
  },
  textBotao: {
    fontFamily: 'Inder_400Regular',
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  botaoPequeno: {
    backgroundColor: "#ff8c90", 
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
    marginRight: 40,
    zIndex: 1,
  },
  textBotaoPequeno: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: 'Inder_400Regular',
  },
  frase: {
    fontFamily: 'Inder_400Regular',
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginRight: 40,
    marginBottom: 20,
  },
  imageLogo: {
    bottom: 1,
    width: '100%',
    height: '40%',
    resizeMode: "contain",
}
});
