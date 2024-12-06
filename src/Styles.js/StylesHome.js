import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        marginTop: 100,

    },
    containerFilho: {
        marginTop: 20,
    },
    containerBotao: {
        marginTop: 40,
    },
    containerSmallButton: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 30,
        marginTop: 15,
    },
    mascote: {
        marginLeft: 50,
        marginTop: -100,
        height: 320,
        resizeMode: 'repeat',
    },
    input: {
        backgroundColor: '#EFEFFE',
        padding: 10,
        marginTop: 5,
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
    },
    txtInput: {
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        padding: 6,
        // width: não é necessário declarar,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: '#FFB9BD',
    },
    frase: {
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 18,
        fontSize: 25,

    },
    botao: {
        backgroundColor: '#FFB9BD',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
    },

    btnEsqueciSenha: {
        backgroundColor: '#ff8c90',
        borderRadius: 10,

    },

    txtEsqueciSenha: {
        color: "#ffff",
        textAlign: "right",
        paddingHorizontal: 20,
        paddingVertical: 6,
        textDecorationLine: "underline",
    },

    txtBotao: {
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        textAlign: 'center',
        padding: 20,
        fontSize: 25,

    },
})