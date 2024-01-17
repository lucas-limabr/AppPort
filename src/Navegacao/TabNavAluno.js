import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StackNavAluno from "./StackNavAluno";
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MenuAluno from "../Views/MenuAluno";
import PerfilAluno from "../Views/PerfilAluno";
import MenuTrilha from "../Views/MenuTrilhaAluno";
import StackNavTrilha from "./StackNavTrilha";



const Tab = createBottomTabNavigator()

export default function TabNavAluno() {

    

    

    return (
        <Tab.Navigator
            initialRouteName="MenuAluno"
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarActiveBackgroundColor: '#F54F59',
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#ff8c90',
                    borderTopWidth: 0,
                    elevation: 0,
                    borderRadius: 4,
                    height: 80,
                }

            }}>

            <Tab.Screen name='PerfilAluno' component={PerfilAluno} options={{
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    if (focused) {
                        return <Feather name="user" size={50} color={color} />
                    }
                    return <Feather name="user" size={50} color='#fff' />
                }
            }}

            />

            <Tab.Screen name='StackNavTrilha' component={StackNavTrilha} options={{
                
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    if (focused) {
                        return <Ionicons name="trail-sign-outline" size={50} color={color} /> 
                    }
                    return <Ionicons name="trail-sign-outline" size={50} color="#fff" /> 
                },
                 
            }}
            
            />

            <Tab.Screen name='MenuAluno' component={MenuAluno} options={{
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    if (focused) {
                        return <FontAwesome5 name="clipboard-list" size={50} color={color} />
                    }
                    return <FontAwesome5 name="clipboard-list" size={50} color='#fff' />
                }
            }}

            />
            
            <Tab.Screen name='StackNavAluno' component={StackNavAluno} options={{
                tabBarButton: () => null,
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    if (focused) {
                        return <FontAwesome5 name="clipboard-list" size={50} color={color} />
                    }
                    return <FontAwesome5 name="clipboard-list" size={50} color='#fff' />
                }
            }}

            />
        </Tab.Navigator>
    )
}