import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import FamilyScreen from './src/screens/FamilyScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import ProtectionScreen from './src/screens/ProtectionScreen';
import SafeModeScreen from './src/screens/SafeModeScreen';
import AccountScreen from './src/screens/AccountScreen';
import LinkSafetyScreen from './src/screens/LinkSafetyScreen';
import FileProtectionScreen from './src/screens/FileProtectionScreen';
import ScamCallScreen from './src/screens/ScamCallScreen';
import PlansScreen from './src/screens/PlansScreen';
import PaymentScreen from './src/screens/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Family" component={FamilyScreen} />
        <Stack.Screen name="Alerts" component={AlertsScreen} />
        <Stack.Screen name="Protection" component={ProtectionScreen} />
        <Stack.Screen name="SafeMode" component={SafeModeScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="LinkSafety" component={LinkSafetyScreen} />
        <Stack.Screen name="FileProtection" component={FileProtectionScreen} />
        <Stack.Screen name="ScamCall" component={ScamCallScreen} />
        <Stack.Screen name="Plans" component={PlansScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
