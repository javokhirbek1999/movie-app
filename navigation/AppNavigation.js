import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import MovieScreen from '../screens/MovieScreen'
import PersonScreen from '../screens/PersonScreen'
import SearchScreen from '../screens/SearchScreen'


const Stack = createStackNavigator()


const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name='Movie' component={MovieScreen} options={{headerShown: false}} />
        <Stack.Screen name='Person' component={PersonScreen} options={{headerShown: false}} />
        <Stack.Screen name='Search' component={SearchScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation