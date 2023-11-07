import { StyleSheet } from "react-native"


export default StyleSheet.create({
    container:{
        flex:1,
        marginTop:100,        

    },
    containerFilho:{
        alignItems: 'flex-end',
        top: -190,
        zIndex: 1
    },
    botaoGrande:{
        backgroundColor:'#FFB9BD',
        marginLeft:30,
        marginRight: 30,
        borderRadius:10,   
        top: -180
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
        marginTop: -140,
        marginBottom: 18,
        fontSize:25,
        fontFamily: 'Inder_400Regular',

    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        
    },
    imageNome:{
        marginLeft: 0,
        marginTop: -250,
        width: '100%', // Largura como 50% da tela
        height: '100%', // Altura como 50% da tela
        resizeMode: 'contain',
    },

    imageLogo:{
        position: 'absolute',
        bottom: -22,
        width: '100%', 
        height: '50%',
       resizeMode: "contain",
       
       
    },

    
})