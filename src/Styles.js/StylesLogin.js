import { StyleSheet } from "react-native" // aqui voce tem que importar so o stylesheet do react-native pra poder criar os estilos, o nome das propriedades são bem parecidos com os do css, porem no lugar de usar um - pra separar quando o nome é composto, usa-se a letra maiuscula pra isso.
// as vezes eu faço muita gambiarra pra conseguir que os elementos fiquem na posição correta kkk


export default StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        marginTop: 50,
        justifyContent: "space-around",

    },
    containerFilho: {
        marginTop: 140,
        alignItems: 'flex-end',
        zIndex: 1,

    },
    botaoGrande: {
        backgroundColor: '#FFB9BD',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
    },
    botaoPequeno: {
        backgroundColor: '#ff8c90',
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,

    },
    textBotao: {
        color: '#fff',
        textAlign: 'center',
        padding: 35,
        fontSize: 25,
        fontFamily: 'Inder_400Regular',
    },
    textBotaoPequeno: {
        color: '#fff',
        textAlign: 'center',
        padding: 0,
        fontFamily: 'Inder_400Regular',

    },
    frase: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 150,
        fontSize: 25,

        fontFamily: 'Inder_400Regular',

    },
    gradient: {
        ...StyleSheet.absoluteFillObject,

    },
    imageNome: {
        marginLeft: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    imageLogo: {
        bottom: 1,
        width: '100%',
        height: '40%',
        resizeMode: "contain",
    }
})