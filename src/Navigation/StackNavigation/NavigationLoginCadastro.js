import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../Views/Login";
import Cadastro from "../../Views/Cadastro"
import Tab from "../TabNavigation/Tab"

const Stack = createStackNavigator()

export default  function PassaStack(){
    
    return (
        
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Cadastro' component={Cadastro} />
          <Stack.Screen name='Tab' component={Tab} />
        </Stack.Navigator>
      
      

        
    )
}