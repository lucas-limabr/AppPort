import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    botao:{
        backgroundColor: '#FFB9BD',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        width: 300,
        marginTop: 10,
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    txtDescritor:{
        color: '#fff',
        flex: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 16
        
        
    }
})