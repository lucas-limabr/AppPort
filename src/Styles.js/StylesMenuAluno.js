
import { StyleSheet } from "react-native"

export default StyleSheet.create({

    buttom: {
        backgroundColor: '#FFB9BD',
        width: 290,
        height: 120,
        margin: 10,
        borderRadius: 10,
        elevation: 10,
    },

    titleStyle: {
        flexDirection: "row",
        backgroundColor: '#F5505A',
        width: '100%',
        height: 35,
        alignItems: 'center',
        justifyContent: "flex-end",
        marginBottom: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    titleStyleFont: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'Inder_400Regular',
    },


    styleFontContent: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 5,
        marginBottom: 5,
        fontFamily: 'Inder_400Regular',
    },

    ButtomAddList: {
        backgroundColor: 'rgba(255,141,148,0.2)',
        width: 290,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#F54F59',
        borderRadius: 10,
    },

    ButtomAddListText: {
        color: '#F54F59',
        fontSize: 40,
    },

    viewInput: {
        backgroundColor: '#FFB9BD',
        alignItems: 'center',
        width: 310,
        height: 140,
        margin: 10,
        borderRadius: 10,

    },

    buttomContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row",
    },

    buttomContentButtom: {
        backgroundColor: '#F5505A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
        elevation: 12,
        height: 37,
        width: '47%'

    },

    buttomContentText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Inder_400Regular',

    },

    titleInputStyle: {
        width: '100%',
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 3,
    },

    titleInputStyleFont: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Inder_400Regular',
    },

    inputStyle: {
        backgroundColor: '#FFEFEF',
        width: '90%',
        height: 35,
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 10,
        padding: 8,
        borderRadius: 10,
        color: '#3E1E1E',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column",
        marginBottom: "25%",
    },

    box: {
        zIndex: 0,
        height: '100%',
        width: '100%',
        position: 'relative'
    },

    containerTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        marginTop: 55,
        marginBottom: 5,
    },


    gradient: {
        ...StyleSheet.absoluteFillObject,

    },

    backgroundOpacity: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'rgba(0,7,186,0.4)',
        alignItems: 'center',
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
    },
    containerModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    criarLista: {
        color: "#F54F59",
        textTransform: "uppercase",
        fontWeight: "bold",
        textShadowColor: '#acacac',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 7
    },
        btnDeleteList: {
            marginLeft: "25%",
            height: "100%",
            width: "12%",
        },
        iconeDelete: {
            color: "#e73434",
            fontSize: 22,
            borderColor: "#6a6868",
            borderWidth: 1.2,
            textAlign: "center",
            backgroundColor: "#FFB9BD",
            padding: 5,
        }
    })