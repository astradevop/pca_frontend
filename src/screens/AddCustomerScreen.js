import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { addCustomer } from '../api';

const AddCustomerScreen = ({ navigation }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [emiDue, setEmiDue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!accountNumber || !issueDate || !interestRate || !tenure || !emiDue) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        // Validate date format YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(issueDate)) {
            Alert.alert('Validation Error', 'Issue Date must be in YYYY-MM-DD format (e.g. 2024-01-15).');
            return;
        }

        setLoading(true);
        try {
            await addCustomer({
                account_number: accountNumber.toUpperCase(),
                issue_date: issueDate,
                interest_rate: parseFloat(interestRate),
                tenure: parseInt(tenure),
                emi_due: parseFloat(emiDue),
            });
            Alert.alert('Success', `Customer ${accountNumber.toUpperCase()} added successfully!`, [
                { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
            ]);
        } catch (err) {
            const errorData = err.response?.data;
            const msg = errorData
                ? (typeof errorData === 'string' ? errorData : JSON.stringify(errorData))
                : 'Network or server error.';
            Alert.alert('Failed to Add Customer', msg);
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
                <Text style={styles.header}>Add New Customer</Text>
                <Text style={styles.subtext}>Enter the loan details for the new customer.</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Account Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. ACC1001"
                        placeholderTextColor="#8b949e"
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        autoCapitalize="characters"
                    />

                    <Text style={styles.label}>Issue Date (YYYY-MM-DD)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 2024-01-15"
                        placeholderTextColor="#8b949e"
                        value={issueDate}
                        onChangeText={setIssueDate}
                    />

                    <Text style={styles.label}>Interest Rate (%)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 12.5"
                        placeholderTextColor="#8b949e"
                        value={interestRate}
                        onChangeText={setInterestRate}
                        keyboardType="decimal-pad"
                    />

                    <Text style={styles.label}>Tenure (Months)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 24"
                        placeholderTextColor="#8b949e"
                        value={tenure}
                        onChangeText={setTenure}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>EMI Due (₹)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 5000"
                        placeholderTextColor="#8b949e"
                        value={emiDue}
                        onChangeText={setEmiDue}
                        keyboardType="decimal-pad"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Add Customer</Text>
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
    button: {
        backgroundColor: '#238636',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddCustomerScreen;
