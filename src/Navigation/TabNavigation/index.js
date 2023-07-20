import React from "react";
import {SafeAreaView } from "react-native";
import {NavigationContainer} from '@react-navigation/native'
import Tab from "./Tab";


export default props => {
    return( 
    <SafeAreaView style ={{flex:1}}>
        <NavigationContainer>
         <Tab/>
        </NavigationContainer>
    </SafeAreaView>
    )
 }