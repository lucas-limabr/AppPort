import React from "react";
import {SafeAreaView } from "react-native"
import {NavigationContainer} from '@react-navigation/native'
import TabNav from "./TabNav"; 



export default function Navegacao() {
    return( 
    <SafeAreaView style ={{flex:1}}>
        <NavigationContainer>
            <TabNav />
        </NavigationContainer>
    </SafeAreaView>
    )
 }