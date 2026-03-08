import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { loginUser, setAuthToken } from '../api';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password.');
            return;
        }
        setLoading(true);
        try {
            const data = await loginUser(username, password);
            setAuthToken(data.access);
            navigation.replace('Dashboard');
        } catch (err) {
            const msg = err.response?.data?.detail || 'Invalid credentials. Please try again.';
            Alert.alert('Login Failed', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.inner}>
                <View style={styles.logoBox}>
                    <Text style={styles.logoText}>PCA</Text>
                    <Text style={styles.logoSub}>Payment Collection App</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to your admin account</Text>

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="#8b949e"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#8b949e"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Sign In</Text>
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
    inner: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    logoBox: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoText: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#58a6ff',
        letterSpacing: 4,
    },
    logoSub: {
        color: '#8b949e',
        fontSize: 14,
        marginTop: 4,
        letterSpacing: 1,
    },
    card: {
        backgroundColor: '#161b22',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#30363d',
        padding: 24,
    },
    title: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subtitle: {
        color: '#8b949e',
        fontSize: 14,
        marginBottom: 24,
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
        marginTop: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LoginScreen;
