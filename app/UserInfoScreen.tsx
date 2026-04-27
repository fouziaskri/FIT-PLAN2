import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet,
  ScrollView, Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function UserInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fullName = params.fullName as string;

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge]       = useState('');
  const [goal, setGoal]     = useState('');

  const goals = ['Lose Weight', 'Gain Muscle', 'Maintain'];

  function handleContinue() {
    if (!weight || !height || !age || !goal) {
      Alert.alert('Missing Info', 'Please fill in all fields and choose a goal.');
      return;
    }
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid numbers.');
      return;
    }
    router.push({
      pathname: '/FoodPlanScreen',
      params: {
        weight: weight,
        height: height,
        age: age,
        goal: goal,
      },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Welcome message — shows the name from login */}
      {fullName ? (
        <Text style={styles.welcome}>👋 Welcome, {fullName}!</Text>
      ) : null}

      <Text style={styles.title}>📋 Your Info</Text>
      <Text style={styles.subtitle}>Tell us about yourself</Text>

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 70"
        placeholderTextColor="#666"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 175"
        placeholderTextColor="#666"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 20"
        placeholderTextColor="#666"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Select Your Goal</Text>
      <View style={styles.goalRow}>
        {goals.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.goalButton, goal === item && styles.goalButtonActive]}
            onPress={() => setGoal(item)}
          >
            <Text style={[styles.goalText, goal === item && styles.goalTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue →</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f0f',
    padding: 30,
    paddingTop: 60,
    flexGrow: 1,
  },
  welcome: {
    color: '#e0ff4f',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e0ff4f',
    marginBottom: 6,
  },
  subtitle: {
    color: '#aaaaaa',
    fontSize: 14,
    marginBottom: 30,
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
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 8,
  },
  goalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  goalButtonActive: {
    backgroundColor: '#e0ff4f',
    borderColor: '#e0ff4f',
  },
  goalText: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
  },
  goalTextActive: {
    color: '#0f0f0f',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#e0ff4f',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});