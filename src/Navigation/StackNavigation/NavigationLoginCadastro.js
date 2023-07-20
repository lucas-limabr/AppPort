import React from "react";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../Views/Login";
import Cadastro from "../../Views/Cadastro"

const Stack = createStackNavigator()

export default  function PassaStack(){
    
    return (
        
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Cadastro' component={Cadastro} />
        </Stack.Navigator>
      
      

        
    )
}