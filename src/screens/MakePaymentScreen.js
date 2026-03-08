import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { makePayment } from '../api';

const MakePaymentScreen = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!accountNumber || !amount) {
      Alert.alert('Validation Error', 'Please enter account number and amount.');
      return;
    }

    setLoading(true);
    try {
      const paymentData = {
        account_number: accountNumber,
        payment_amount: parseFloat(amount),
        status: status,
      };
      
      const res = await makePayment(paymentData);
      Alert.alert('Success', `Payment recorded successfully! TXN ID: ${res.payment?.id || 'Confirmed'}`);
      setAccountNumber('');
      setAmount('');
      setStatus('pending');
      navigation.navigate('Dashboard');
    } catch (err) {
      const errorMsg = err.response?.data 
        ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)) 
        : 'Network or server error';
      Alert.alert('Payment Failed', `Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.header}>Submit Payment</Text>
        <Text style={styles.subtext}>Enter the EMI details for the personal loan below.</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. ACC123"
            placeholderTextColor="#8b949e"
            value={accountNumber}
            onChangeText={setAccountNumber}
            autoCapitalize="characters"
          />
          
          <Text style={styles.label}>EMI Amount (₹)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 5000"
            placeholderTextColor="#8b949e"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Payment Status</Text>
          <View style={styles.statusRow}>
            {['pending', 'completed', 'failed'].map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.statusToggle, status === s && styles[`status_${s}`]]}
                onPress={() => setStatus(s)}
              >
                <Text style={[styles.statusText, status === s && { color: 'white' }]}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Submit Payment</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    color: '#8b949e',
    fontSize: 14,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 16,
    borderRadius: 12,
  },
  label: {
    color: '#c9d1d9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0d1117',
    borderWidth: 1,
    borderColor: '#30363d',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statusToggle: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#30363d',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#8b949e',
    fontWeight: 'bold',
  },
  status_pending: {
    backgroundColor: '#d29922',
    borderColor: '#d29922',
  },
  status_completed: {
    backgroundColor: '#238636',
    borderColor: '#238636',
  },
  status_failed: {
    backgroundColor: '#da3633',
    borderColor: '#da3633',
  },
  button: {
    backgroundColor: '#58a6ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default MakePaymentScreen;
