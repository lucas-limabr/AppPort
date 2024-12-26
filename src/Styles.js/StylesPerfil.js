import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',

    },
    containerFilho: {
        marginTop: 10,
    },
    image: {
        width: null,
        height: 'auto',
        flex: 1,
        resizeMode: "cover"
    },
    backgroundUser: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#00000000',
    },
    botao: {
        backgroundColor: '#ff8c90',
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    sombra: {
        shadowColor: '#000',
        elevation: 10,
    },
    txtBotao: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Inder_400Regular',
    },
    input: {
        backgroundColor: '#EFEFFE',
        marginTop: 5,
        width: 300,
        borderRadius: 10,
        justifyContent: "center",
        padding: 10
    },
    campoEmail: {
        paddingTop: 10,
        paddingBottom: 10
    },
    txtInput: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',

    }
})