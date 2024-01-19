import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MenuAluno from "../Views/MenuAluno";
import PerfilAluno from "../Views/PerfilAluno";
import MenuTrilha from "../Views/MenuTrilhaAluno";
import AcertouQuestao from "../Views/AcertouQuestaoAluno"
import ErrouQuestao from "../Views/ErrouQuestaoAluno"
import SubMenu1 from "../Views/SubMenu1"
import SubMenu2 from "../Views/SubMenu2"
import SubMenu3 from "../Views/SubMenu3"
import QuestoesAluno from "../ListaDeListas/indexAluno";


import {useTabDisplay} from "../hooks/useTabDisplay"
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function StackNavAluno({navigation, route}) {

  useTabDisplay({navigation, route, screens: ['MenuTrilha','StackNavAluno','PerfilAluno','MenuAluno']})

  

  return (
    <Stack.Navigator
      initialRouteName="MenuTrilha"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MenuAluno" component={MenuAluno} />
      <Stack.Screen name="PerfilAluno" component={PerfilAluno} />
      <Stack.Screen name="MenuTrilha" component={MenuTrilha} />
      <Stack.Screen name="AcertouQuestao" component={AcertouQuestao} />
      <Stack.Screen
        name="ErrouQuestao"
        component={ErrouQuestao}
      />
      <Stack.Screen
        name="SubMenu1"
        component={SubMenu1}
      />
      <Stack.Screen
        name="SubMenu2"
        component={SubMenu2}
      />
      <Stack.Screen
        name="SubMenu3"
        component={SubMenu3}
      />
      <Stack.Screen
        name="QuestoesAluno"
        component={QuestoesAluno}
      />
      </Stack.Navigator>
  );
}