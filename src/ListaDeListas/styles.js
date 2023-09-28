import { StyleSheet } from "react-native"



export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,        
    },
    container: {
        flex: 1,
        marginTop: 25,
        alignItems: 'center'
       
    },
    enunciado:{
        backgroundColor: '#ff8c90',
        height: 350,
        width: 300,
        marginTop : 20,
        borderRadius: 10,
        alignItems: 'center'
        
    },
    backgroundImagem:{
        backgroundColor: '#F54F59',
        height: 250,
        width: 250,
        marginTop: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtEnunciado:{
        fontSize: 18,
        color: '#fff',
        top: 10,
        left: 5,
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inder_400Regular', 
    },
    containerResposta:{
        alignItems: 'flex-start',
        width: 300,
        marginTop: 50,
       
    },
    resposta:{
        backgroundColor: '#ff8c90',
        marginTop: 10
    },
    imagem:{
        height: 240,
        width: 240,
        borderRadius: 10,
    },
    alternativas:{
        flexDirection: 'row-reverse',
        backgroundColor:'#ffb9bd',
        borderRadius: 50,
        width: 300,
        marginTop: 5,
        height: 40,        
    },
    label:{
        fontFamily: 'Inder_400Regular',
        color: '#fff',
        textAlign: "auto",
        
        
    },
    selectLabel:{
        backgroundColor: '#F54F59'
    },
    btnContinuar:{
        backgroundColor: '#F54F59',
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

    },
    containerContinuar:{
        width: 300,
        top: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
    

})