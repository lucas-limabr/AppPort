import { StyleSheet } from "react-native"



export default StyleSheet.create({
    container:{
        flex:1,
        marginTop:100,
              

    },
    containerFilho:{
        flexDirection:"column",
        marginTop: 5,

    },
    descricao:{
        color: '#fff',
        fontFamily: 'Inder_400Regular',
        padding:8,
        width:70,
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
        textAlign:'left',
        backgroundColor: '#FFB9BD',
    },
    descricaoGrande:{
            color: '#fff',
            fontFamily: 'Inder_400Regular',
            padding:8,
            width:180,
            marginLeft:20,
            marginRight: 20,
            borderRadius:10,
            textAlign:'left',
            backgroundColor: '#FFB9BD',  
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
    botao:{
        backgroundColor:'#FFB9BD',
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
        
    },
    textBotao:{
        color: '#fff',
        textAlign: 'center',
        padding: 20,
        fontFamily: 'Inder_400Regular',
        
       
        
    },
    registrar:{
        color: '#fff',
        textDecorationLine:'underline',
        textAlign:'center',
        marginTop: 18,
        marginBottom: 18,

    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        
    },
    imageNome:{
       marginLeft: -50,
       marginTop: 30,
       height:250,
       resizeMode: "repeat",
       

    },
    imageLogo:{
       marginLeft: 70,
       marginTop: -240,
       height:500,
       resizeMode: "repeat",
       

    },

    
})

