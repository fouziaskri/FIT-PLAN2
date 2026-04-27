import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet,
  Alert, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { users } from './storage';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {
    // Check nothing is empty
    if (!fullName || !username || !password) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    // Check username not already taken
    const exists = users.find(u => u.username === username);
    if (exists) {
      Alert.alert('Username Taken', 'This username already exists. Try another.');
      return;
    }

    // Save new user to the array
    users.push({ fullName, username, password });

    Alert.alert(
      'Registered! ✅',
      `Welcome ${fullName}! You can now log in.`,
      [{ text: 'Go to Login', onPress: () => router.replace('/') }]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      <Text style={styles.logo}>🏋️</Text>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join FitPlan today</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. John Smith"
        placeholderTextColor="#666"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Choose a username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Choose a password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>✅ Confirm Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  inner: {
    padding: 30,
    paddingTop: 80,
  },
  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
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
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
  backText: {
    color: '#aaaaaa',
    fontSize: 14,
  },
});