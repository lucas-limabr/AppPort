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
    containerSonAux: {
        height: 140,
        width: 315,
        padding: 8,
    },

    containerSonAuxFlexbox: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },

    numberDays: {
        alignItems: "center",
        height:"auto",
        borderRadius: 20,
    },

    txtnumberDays: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 30,

    },
    
    txtTitleView: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 18,

    },

    txtDate: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 20,
        marginTop:10

    },

    titleView: {
        alignItems: "center",
        height:"auto",
        borderRadius: 20,
    },

    image: {
        height: 120,
        resizeMode: "contain",
    },

    ViewDados: {
        backgroundColor: '#EFEFFE',
        height: 120,
        width: 140,
        borderRadius: 10,
        alignItems: "center",
        padding:8,
    },

    backgroundUser: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: '#FFB9BD',
        borderWidth: 5,
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
        padding: 4,
        marginTop: 5,
        height: 50,
        width: 300,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
    },

    viewOptions: {
        backgroundColor: '#EFEFFE',
        marginTop: 5,
        height: 50,
        width: 300,
        borderRadius: 10,
        justifyContent: "center",
    },

    txtInput: {
        color: '#ff8c90',
        padding: 2,
        fontFamily: 'Inder_400Regular',

    }
})