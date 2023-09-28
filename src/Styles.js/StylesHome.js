import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,        
    },
    container:{
        flex:1,
        marginTop:100,        

    },
    containerFilho:{
        marginTop:20,
    },
    containerBotao:{
        marginTop: 40,
    },
    mascote:{
        marginLeft:70,
       marginTop:-60,
       height:270,
       resizeMode:'repeat',
    },
    input:{
        backgroundColor: '#EFEFFE',
        padding:0,
        marginTop: 5,
        height:50,
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
    },
    txtInput:{
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        padding:6,
        width:63,
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
        textAlign:'left',
        backgroundColor: '#FFB9BD',
    },
    frase:{
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        textAlign:'center',
        marginTop: 18,
        marginBottom: 18,
        fontSize:25,

    },
    botao:{
        backgroundColor:'#FFB9BD',
        marginLeft:30,
        marginRight: 30,
        borderRadius:10,
    },
    txtBotao:{
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        textAlign: 'center',
        padding: 20,
        fontSize:25,
        
    }
})