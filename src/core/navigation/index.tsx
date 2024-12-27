/* eslint-disable prettier/prettier */
import * as React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen, RegisterScreen } from '@containers'

const hideHeader = {headerShown: false}
export function NavigationApp() {
    const Stack = createNativeStackNavigator()
    function AuthStack (){
        //funcion que rendedriza stack de autenticacion
        return(
            //contenedor padre 
            <Stack.Navigator> 
                {/* contenedores hijos */}
                <Stack.Screen name='Login'
                component={LoginScreen}
                options={hideHeader}>
                </Stack.Screen>
                <Stack.Screen name='Register'
                component={RegisterScreen}
                options={hideHeader}>
                </Stack.Screen>


            </Stack.Navigator>
        )
    }
    const Tab = createBottomTabNavigator ()
    function MainApp(){
        //funcion que renderiza stack de la app
        return(
            <Tab.Navigator>
                <Tab.Screen name='Home' 
                component={()=> <Text>Hola home</Text>}
                options={hideHeader}>
                </Tab.Screen>
                <Tab.Screen name='Profile' 
                component={()=> <Text>Hola profile</Text>}
                options={hideHeader}>
                </Tab.Screen>

            </Tab.Navigator>
        )
    }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Authentication'>
            <Stack.Screen 
            name='Authentication'
            component={AuthStack}  
            options={hideHeader}>
            </Stack.Screen>
            <Stack.Screen 
            name='MainApp'
            component={MainApp}
            options={hideHeader}>
            </Stack.Screen>


        </Stack.Navigator>
    </NavigationContainer>
  )
}
