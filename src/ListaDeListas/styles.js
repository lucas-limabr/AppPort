import { StyleSheet } from "react-native"



export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,        
    },
    container: {
        marginTop: 10,
        alignItems: 'center',
        flex: 1
    },
    enunciado:{
        backgroundColor: '#ff8c90',
        height: 'auto',
        width: 300,
        marginTop : 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
        fontSize: 16,
        color: '#fff',
        top: 0,
        width: '90%',
        left: 5,
        padding: 10,
        textAlign: 'left',
        fontFamily: 'Inder_400Regular', 
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
        height: 'auto', 
               
    },
    label:{
        fontFamily: 'Inder_400Regular',
        color: '#fff',
        textAlign: "auto",
        borderWidth: 0
        
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
    containerContinuarProfessor:{
        width: '100%',
        top: 2,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flex: 1,
        position: "relative"
    },
    containerContinuar:{
        top: 5,
        height: 45
    },
    btnSalvar:{
        backgroundColor: '#F54F59',
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10
    },
    containerSalvar:{
        width: '100%',
        right: 30,
        top: 30,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        flex: 1,
       
        
    },
    confirmar:{
        backgroundColor: '#F54F59',
        width: 300,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        
    },
    ScrollViewContent:{
        flex:1
    },
    
    
    
    

})