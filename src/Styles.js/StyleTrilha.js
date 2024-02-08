import React from "react";
import { StyleSheet } from "react-native"

export default StyleSheet.create({
    imageAjust: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    divTela: {
        height: 'auto',
        width: 'auto',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding:10,

    },

    box: {
        height: 500,
        width: 300,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        margin:10,

    },

    AjustItens_left: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: 'row',

    },

    AjustItens_right: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: 'row',

    },

    AjustItens_center: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row',

    },

    boxImage: {
        height: '100%',
        width: '40%',
        justifyContent:"center",
        alignItems:"center",

    },

    boxImageImage: {
        height: 120,
        width: 120,

    },
    
    boxImageButton: {
        height: 120,
        width: 120,
        alignItems:'center',
        justifyContent:'center',
    },

    boxImageButtonText: {
        color:'#fff',
        fontSize:16,
        position:'absolute',
        top:94,
        fontFamily: 'Inder_400Regular',

    },

    

});