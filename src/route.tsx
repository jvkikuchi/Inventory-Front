/* eslint-disable react/no-unstable-nested-components */
import Register from './pages/Register';
import Login from './pages/Login';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import type {StackParamsList} from './types/rootStackParamListType';



const Stack = createNativeStackNavigator<StackParamsList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
