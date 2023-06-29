import React from "react";
import {createBottomTabNavigator} from'@react-navigation/bottom-tabs'
import Menu from "../Views/Menu";
import Perfil from "../Views/Perfil";
import Listas from "../Views/Listas";
import { Ionicons } from '@expo/vector-icons'
import { Feather, Entypo, FontAwesome5  } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default props => (
    <Tab.Navigator 
    initialRouteName="Menu"
    screenOptions={{
        tabBarActiveTintColor: '#fff',
        
        tabBarShowLabel: false,
        tabBarStyle:{
            position: 'absolute',
            backgroundColor: '#F54F59',
            borderTopWidth: 0,

            bottom: 14,
            left: 14,
            right: 14,
            elevation: 0,
            borderRadius: 4,
            height: 60,
        }

    }}>

            <Tab.Screen name='Perfil' component={Perfil} options={{
                headerShown:false,
                tabBarIcon: ({color, size, focused}) => {
                    if(focused) {
                        return <Feather name="user" size={size} color={color} />
                    }
                    return <Feather name="user" size={size} color='#000' />
                }
                }} 
                />
            <Tab.Screen name='Menu' component={Menu} options={{
                headerShown:false,
                tabBarIcon: ({color, size, focused}) => {
                    if(focused) {
                        return <Entypo name="home" size={size} color={color} />
                    }
                    return <Entypo name="home" size={size} color='#000' />
                }
                }} 
                
                  />
            <Tab.Screen name='Listas' component={Listas} options={{
                headerShown:false,
                tabBarIcon: ({color, size, focused}) => {
                    if(focused) {
                        return <FontAwesome5 name="clipboard-list" size={size} color={color} />
                    }
                    return <FontAwesome5 name="clipboard-list" size={size} color='#000' />
                }
                }} 

                 />

        </Tab.Navigator>
)