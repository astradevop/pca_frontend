import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './src/screens/DashboardScreen';
import MakePaymentScreen from './src/screens/MakePaymentScreen';
import PaymentHistoryScreen from './src/screens/PaymentHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: '#161b22' },
          headerTintColor: '#58a6ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'PCA Portal' }}
        />
        <Stack.Screen 
          name="MakePayment" 
          component={MakePaymentScreen} 
          options={{ title: 'Make Payment' }}
        />
        <Stack.Screen 
          name="PaymentHistory" 
          component={PaymentHistoryScreen} 
          options={{ title: 'Payment History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
