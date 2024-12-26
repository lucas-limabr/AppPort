import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        backgroundColor:'rgba(0, 0, 0, 0.88)',        
        flex: 1,
        justifyContent: 'center',       
    },
    boxGeral:{
        backgroundColor: '#FF8D94',
        height: 350,
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo:{
        fontFamily: 'Inder_400Regular',
        color: '#fff',
        fontSize: 25,
        top: 15
    },
    input:{
        backgroundColor: '#EFEFFE',
        padding:10,
        marginTop: 5,
        height:50,
        marginLeft:20,
        marginRight: 20,
        borderRadius:10,
        borderWidth: 1,

    },
    label:{
        fontFamily: 'Inder_400Regular',
        color: '#fff',
        fontSize: 20,
        left: 20,
        justifyContent:'center'
    },
    botao:{
        backgroundColor:'#F54F59',
        borderRadius:10,
        paddingHorizontal: 40,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    txtBotao:{
        fontFamily: 'Inder_400Regular',
        color: '#fff',
        fontSize: 20,
        justifyContent:'center'
    },
    botaoEditar:{
        alignItems: 'center',
        width: '100vw',
        marginBottom: 40,
        backgroundColor:'#F54F59',
        borderRadius:10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        
    },
    txtEditar:{
        fontFamily: 'Inder_400Regular',
        alignItems: 'center',
        color: '#fff',
        fontSize: 20,
        left: 0
    }

})