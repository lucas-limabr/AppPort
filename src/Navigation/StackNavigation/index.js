import React from "react";
import {SafeAreaView } from "react-native"
import {NavigationContainer} from '@react-navigation/native'
import PassaStack from "./NavigationLoginCadastro"
import {useFonts, Inder_400Regular} from "@expo-google-fonts/inder"

export default function Stack() {



    return( 
    <SafeAreaView style ={{flex:1}}>
        <NavigationContainer>
         <PassaStack/>
        </NavigationContainer>
    </SafeAreaView>
    )
 }