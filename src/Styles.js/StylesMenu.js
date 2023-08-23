import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,        
    },
    container:{
        flex:1,
        marginTop: 100,
        alignItems: 'center',

    },
    containerFilho:{
        flexDirection:'row',
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    descritores:{
        backgroundColor:'#ff8c90',
        padding: 3,
        width: 120,
        height: 100,
        borderRadius: 5,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    txtDescritores:{
        color: '#fff',
        fontSize:15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'Inder_400Regular',

    }
})