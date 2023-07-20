import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,        
    },
    container:{
        flex:1,
        marginTop:100,
        alignItems: 'center',        

    },
    containerFilho:{
        marginTop: 10,
    },
    image:{  
            height:120,
            resizeMode: "contain",
    },
    backgroundUser:{
        backgroundColor: '#fff',
        width:200,
        height:200,
        borderRadius: 100,
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center',
        borderColor: '#FFB9BD',
        borderWidth: 5, 
    },
    botao:{
        backgroundColor:'#ff8c90',
        width: 120,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginTop: 20,  
    },
    sombra:{
        shadowColor:'#000',
        elevation:10,
    },
    txtBotao:{
        color: '#fff',
        textAlign: 'center',
        fontSize:15,
        fontFamily: 'Inder_400Regular',
    },
    input:{
        backgroundColor: '#EFEFFE',
        padding:4,
        marginTop: 5,
        height:50,
        width:300,
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
    },
    txtInput:{
        color: '#ff8c90',
        padding:2,
        fontFamily: 'Inder_400Regular',

    }
})