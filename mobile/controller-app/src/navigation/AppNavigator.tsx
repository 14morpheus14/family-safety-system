import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FamilyScreen from '../screens/FamilyScreen';
import AlertsScreen from '../screens/AlertsScreen';
import ProtectionScreen from '../screens/ProtectionScreen';
import LinkSafetyScreen from '../screens/LinkSafetyScreen';
import FileProtectionScreen from '../screens/FileProtectionScreen';
import ScamCallScreen from '../screens/ScamCallScreen';
import AccountScreen from '../screens/AccountScreen';
import SafeModeScreen from '../screens/SafeModeScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';

import PaymentsMenuScreen from '../screens/PaymentsMenuScreen';
import PaymentScreen from '../screens/PaymentScreen';


const Tab =
  createBottomTabNavigator();

const Stack =
  createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1c8c5e',
        tabBarInactiveTintColor: '#777',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Family"
        component={FamilyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="people"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="notifications"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Protection"
        component={ProtectionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="security"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={BottomTabs}
        />

        <Stack.Screen
          name="LinkSafety"
          component={LinkSafetyScreen}
        />

        <Stack.Screen
          name="FileProtection"
          component={FileProtectionScreen}
        />

        <Stack.Screen
          name="ScamCall"
          component={ScamCallScreen}
        />

        <Stack.Screen
          name="SafeMode"
          component={SafeModeScreen}
        />

        <Stack.Screen
          name="Subscription"
          component={SubscriptionScreen}
        />

        <Stack.Screen
          name="PaymentsMenu"
          component={PaymentsMenuScreen}
        />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
