import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from "../Views/Cadastro"
import Home from "../Views/Home";

const Stack = createStackNavigator()

export default function LoginNav(){
    
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{}} >
          <Stack.Screen name='Cadastro' component={Cadastro} />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
}