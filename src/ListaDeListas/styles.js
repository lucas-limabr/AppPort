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
        borderRadius: 10
    },
    txtEnunciado:{
        fontSize: 20,
        color: '#fff',
        // fontFamily: 'Inder_400Regular', 
    },
    containerResposta:{
        alignItems: 'flex-start',
        
        width: 260,
        marginTop: 50,
        marginLeft: 15,
    },
    resposta:{
        backgroundColor: '#ff8c90',
        marginTop: 10
    }

})