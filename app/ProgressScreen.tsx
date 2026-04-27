import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ScrollView, TextInput,
  TouchableOpacity, Alert, Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 40;

export default function ProgressScreen() {
  const [weightInput, setWeightInput] = useState('');
  const [entries, setEntries] = useState<{ day: string; weight: number }[]>([
    { day: 'Day 1', weight: 80 },
    { day: 'Day 2', weight: 79.5 },
    { day: 'Day 3', weight: 79 },
  ]);

  function addWeight() {
    const value = parseFloat(weightInput);
    if (isNaN(value) || value < 20 || value > 300) {
      Alert.alert('Invalid', 'Please enter a valid weight (20–300 kg).');
      return;
    }
    const nextDay = `Day ${entries.length + 1}`;
    setEntries([...entries, { day: nextDay, weight: value }]);
    setWeightInput('');
  }

  const labels = entries.map(e => e.day);
  const data   = entries.map(e => e.weight);

  const firstWeight = entries[0]?.weight ?? 0;
  const lastWeight  = entries[entries.length - 1]?.weight ?? 0;
  const difference  = (lastWeight - firstWeight).toFixed(1);
  const lost        = parseFloat(difference) < 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Progress Tracker</Text>
      <Text style={styles.subtitle}>Track your weight over time</Text>

      {/* Summary Box */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>Current Weight</Text>
        <Text style={styles.summaryWeight}>{lastWeight} kg</Text>
        <Text style={[styles.summaryChange, { color: lost ? '#4caf50' : '#f44336' }]}>
          {lost ? `▼ Lost ${Math.abs(parseFloat(difference))} kg` : `▲ Gained ${difference} kg`}
          {' since start'}
        </Text>
      </View>

      {/* Chart */}
      {entries.length >= 2 && (
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Weight Over Time</Text>
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: data }],
            }}
            width={screenWidth}
            height={200}
            yAxisSuffix=" kg"
            chartConfig={{
              backgroundColor: '#1c1c1c',
              backgroundGradientFrom: '#1c1c1c',
              backgroundGradientTo: '#1c1c1c',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(224, 255, 79, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(170, 170, 170, ${opacity})`,
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#e0ff4f',
              },
            }}
            bezier
            style={{ borderRadius: 10 }}
          />
        </View>
      )}

      {/* Input */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Enter today's weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 78.5"
          placeholderTextColor="#666"
          keyboardType="decimal-pad"
          value={weightInput}
          onChangeText={setWeightInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addWeight}>
          <Text style={styles.addButtonText}>+ Add Entry</Text>
        </TouchableOpacity>
      </View>

      {/* History */}
      <View style={styles.historyBox}>
        <Text style={styles.historyTitle}>📋 Weight History</Text>
        {entries.map((entry, index) => (
          <View key={index} style={styles.historyRow}>
            <Text style={styles.historyDay}>{entry.day}</Text>
            <Text style={styles.historyWeight}>{entry.weight} kg</Text>
          </View>
        ))}
      </View>

      {/* Motivation */}
      <View style={styles.motivationBox}>
        <Text style={styles.motivationText}>
          🔥 Keep going! Every day counts.{'\n'}
          Small steps lead to big results!
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 40,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  summaryBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0ff4f',
  },
  summaryLabel: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 4,
  },
  summaryWeight: {
    color: '#e0ff4f',
    fontSize: 48,
    fontWeight: 'bold',
  },
  summaryChange: {
    fontSize: 14,
    marginTop: 4,
  },
  chartBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 12,
  },
  inputBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#e0ff4f',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 15,
  },
  historyBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  historyTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 12,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  historyDay: {
    color: '#aaa',
    fontSize: 14,
  },
  historyWeight: {
    color: '#e0ff4f',
    fontSize: 14,
    fontWeight: 'bold',
  },
  motivationBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4fc3f7',
  },
  motivationText: {
    color: '#4fc3f7',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
});