import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { getPaymentHistory } from '../api';

const PaymentHistoryScreen = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!accountNumber) return;
    setLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const data = await getPaymentHistory(accountNumber.trim());
      setHistory(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('No history found for this account.');
      } else {
        setError('Failed to retrieve history data.');
      }
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return '#3fb950';
      case 'failed': return '#ff7b72';
      default: return '#e3b341';
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.paymentId}>#{item.id}</Text>
        <Text style={[styles.statusBadge, { color: getStatusColor(item.status), borderColor: getStatusColor(item.status) }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account:</Text>
        <Text style={styles.value}>{item.account_number}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Paid Amount:</Text>
        <Text style={[styles.value, { color: '#58a6ff', fontWeight: 'bold' }]}>₹{item.payment_amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date Received:</Text>
        <Text style={styles.value}>{item.payment_date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Payments</Text>
      
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Account No (e.g. ACC123)"
          placeholderTextColor="#8b949e"
          value={accountNumber}
          onChangeText={setAccountNumber}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#58a6ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : searched ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={styles.empty}>No payment records found.</Text>}
        />
      ) : null}
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
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#238636',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
    paddingBottom: 8,
    marginBottom: 12,
  },
  paymentId: {
    color: '#8b949e',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    marginTop: 20,
  },
  empty: {
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  }
});

export default PaymentHistoryScreen;
