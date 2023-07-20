import { StyleSheet } from "react-native"


export default StyleSheet.create({
    container:{
        flex:1,
        marginTop:100,        

    },
    containerFilho:{
        alignItems: 'flex-end',
    },
    botaoGrande:{
        backgroundColor:'#FFB9BD',
        marginLeft:30,
        marginRight: 30,
        borderRadius:10,   
    },
    botaoPequeno:{
        backgroundColor:'#ff8c90',
        width: 120,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:30,
        marginTop: 30,
        marginRight: 30,
        borderRadius:10,
    },
    textBotao:{
        color: '#fff',
        textAlign: 'center',
        padding: 35,
        fontSize:25,
        fontFamily: 'Inder_400Regular',     
    },
    textBotaoPequeno:{
        color: '#fff',
        textAlign: 'center',
        padding: 0,
        fontFamily: 'Inder_400Regular',   
        
    },
    frase:{
        color: '#fff',
        textAlign:'center',
        marginTop: 18,
        marginBottom: 18,
        fontSize:25,
        fontFamily: 'Inder_400Regular',

    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        
    },
    imageNome:{
       marginLeft: -30,
       marginTop: -50,
       height:230,
       resizeMode: "repeat",
       

    },
    imageLogo:{
       marginLeft: 40,
       marginTop: -240,
       height:500,
       resizeMode: "repeat",
    },

    
})