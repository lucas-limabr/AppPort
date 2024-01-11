import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,

    },

    box: {
        margin: 10,
        alignItems: 'center',
        height: "auto",
        width: "auto",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },

    boxTitle: {
        height: "auto",
        width: 350,
    },

    boxImage: {
    },

    ImageFormat: {
        height: 360,
        width: 360,
        margin: -6,
    },

    Title: {
        color: '#FF6262',
        textAlign: 'center',
        fontSize: 54,
        fontWeight: "bold",
        top: 40,
        fontFamily: 'Inder_400Regular',
    },

    SubTitle: {
        color: '#FF8686',
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'Inder_400Regular',
    },

    FontFormat: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Inder_400Regular',
    },

    FontFormatButtom: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Inder_400Regular',
    },

    subDivTag: {
        width: 300,
        height: 10,
        flex: 1,
        justifyContent: "flex-start",
    },

    subSubDivTag: {
        flex: 1,
        justifyContent: 'center'
    },

    shadow:{
        shadowColor:'#000',
        elevation:10,
    },

    buttom: {
        backgroundColor: '#F5505A',
        padding: 8,
        margin: 10,
        width: 250,
        height: 100,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },

    tagText: {
        backgroundColor: '#FF8686',
        margin: 4,
        padding: 4,
        borderRadius: 10,
        height: 45,
        width: 115,
        justifyContent: "center",

    },

    buttomBox: {
        margin: 10,
        width: 300,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});