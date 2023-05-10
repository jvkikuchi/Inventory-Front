/* eslint-disable react/no-unstable-nested-components */
import Register from './pages/Register';
import Login from './pages/Login';
import ListProducts from './pages/ListProducts';
import Product from './pages/Product';
import UpseartProduct from './pages/UpseartProduct';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import type {
  StackParamsList,
  TabParamsList,
} from './types/rootStackParamListType';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from './components/Icon';

const Tab = createBottomTabNavigator<TabParamsList>();

const icons = {
  ListProducts: 'BookOpen',
};

const TabsStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const iconName = icons[route.name];

          return (
            <Icon
              stroke={color}
              fill="#3A4750"
              strokeWidth={3}
              // @ts-ignore iconName is hardcode
              name={iconName}
              width={40}
              height={30}
            />
          );
        },
        tabBarActiveTintColor: '#FF9A3C',
        tabBarInactiveTintColor: '#AEAEAE',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#3A4750',
          height: 60,
          paddingVertical: 10,
        },
      })}>
      <Tab.Screen name="ListProducts" component={ListProducts} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator<StackParamsList>();
export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'UpseartProduct'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="UpseartProduct" component={UpseartProduct} />
        <Stack.Screen name="Tabs" component={TabsStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
