import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCustomers, setAuthToken } from '../api';

const DashboardScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError('Failed to fetch customers. Ensure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [])
  );

  const handleLogout = () => {
    setAuthToken(null);
    navigation.replace('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.accountNumber}>Account: {item.account_number}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>EMI Due:</Text>
        <Text style={styles.value}>₹{item.emi_due}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Interest Rate:</Text>
        <Text style={styles.value}>{item.interest_rate}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tenure:</Text>
        <Text style={styles.value}>{item.tenure} Months</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Issue Date:</Text>
        <Text style={styles.value}>{item.issue_date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>Customer Loans</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MakePayment')}
        >
          <Text style={styles.buttonText}>+ Make Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate('AddCustomer')}
        >
          <Text style={styles.buttonText}>+ Add Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('PaymentHistory')}
        >
          <Text style={styles.buttonTextSecondary}>History</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#58a6ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.account_number}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={styles.empty}>No customers found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    padding: 16,
  },
  header: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutBtn: {
    backgroundColor: '#21262d',
    borderWidth: 1,
    borderColor: '#da3633',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#da3633',
    fontWeight: 'bold',
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#238636',
    padding: 12,
    borderRadius: 8,
    flex: 0.32,
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: '#1f6feb',
    padding: 12,
    borderRadius: 8,
    flex: 0.32,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#21262d',
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 12,
    borderRadius: 8,
    flex: 0.3,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#c9d1d9',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  accountNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58a6ff',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#8b949e',
    fontSize: 14,
  },
  value: {
    color: '#c9d1d9',
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: '#ff7b72',
    textAlign: 'center',
    marginVertical: 20,
  },
  empty: {
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default DashboardScreen;
