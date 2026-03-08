import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MakePaymentScreen from './src/screens/MakePaymentScreen';
import PaymentHistoryScreen from './src/screens/PaymentHistoryScreen';
import AddCustomerScreen from './src/screens/AddCustomerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#161b22' },
          headerTintColor: '#58a6ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'PCA Portal', headerLeft: () => null }}
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
        <Stack.Screen
          name="AddCustomer"
          component={AddCustomerScreen}
          options={{ title: 'Add Customer' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
