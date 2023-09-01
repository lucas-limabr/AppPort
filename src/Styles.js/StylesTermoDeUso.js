import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        backgroundColor:'rgba(177, 160, 254, 0.88)',        
        flex: 1,
        justifyContent: 'flex-end',
        
        
    },
    botao:{
        backgroundColor: '#FF8D94',
        padding: 20,
        width: 130,
        borderRadius: 10,
        alignItems: 'center',
        bottom: 10

    },
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        left: 30

    },
    containerBotao:{
        alignItems: 'flex-end',
        right: 20,
        
    },
    textoBotao:{
        fontFamily: 'Inder_400Regular',
        fontSize: 15,
        color: '#fff'
    },
    textoSwitch:{
        fontFamily: 'Inder_400Regular',
        fontSize: 20,
        left: 15

    },
    telaDoTermo:{
        backgroundColor: '#fff',
        height: 300,
        borderRadius: 20,
        width: 300,
        
    },
    center: {
        alignItems: 'center'
    },
    termoDeUso:{
        fontFamily: 'Inder_400Regular',
        textAlign: 'justify',
        padding: 10
    }
})