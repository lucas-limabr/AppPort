import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from "../Views/Cadastro"
import Home from "../Views/Home";
import Login from "../Views/Login";

const Stack = createStackNavigator()

export default function LoginNav(){
    
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name='Cadastro' component={Cadastro} />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
}