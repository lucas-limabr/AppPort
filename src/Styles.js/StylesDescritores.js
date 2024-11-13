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
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    txtDescritor:{
        color: '#fff',
        flex: 2,
        fontFamily: 'Inder_400Regular',
        fontSize: 16
        
        
    },
    voltar:{
        position: 'absolute',
        top: 10,
        height: 50,
        width: 50,
        left: 30,
        zIndex: 1,
        
    },

    iconStyle:{
        color: "#FFFFFF",
        fontSize: 24,
    },

    paginationButton:{
        marginTop: 12,
        width: 42,
        height: 42,
        borderRadius: 25,
        backgroundColor: "#ff8c90",
        justifyContent: "center",
        alignItems: "center",
    },
})