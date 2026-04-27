import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { users } from '../storage';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleLogin() {
    if (!username || !password) {
      Alert.alert('Missing Info', 'Please enter username and password.');
      return;
    }

    // Find user in our storage array
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      // Pass the full name to the next screen
      router.push({
        pathname: '/UserInfoScreen',
        params: { fullName: user.fullName },
      });
    } else {
      Alert.alert('Wrong Login', 'Username or password is incorrect.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏋️</Text>
      <Text style={styles.title}>FitPlan</Text>
      <Text style={styles.subtitle}>Your gym & nutrition planner</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In →</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push('/RegisterScreen')}
      >
        <Text style={styles.registerText}>New user? Register here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 30,
    paddingTop: 80,
  },
  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e0ff4f',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#aaaaaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    color: '#ffffff',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#e0ff4f',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  registerText: {
    color: '#aaaaaa',
    fontSize: 14,
  },
});