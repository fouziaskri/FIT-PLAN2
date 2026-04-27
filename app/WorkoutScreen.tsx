import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  ScrollView, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const workoutData = [
  {
    muscle: '💪 Chest',
    color: '#4fc3f7',
    exercises: [
      '• Push-ups — 3 sets x 15 reps',
      '• Bench Press — 3 sets x 10 reps',
    ],
  },
  {
    muscle: '🔙 Back',
    color: '#ce93d8',
    exercises: [
      '• Rows — 3 sets x 12 reps',
      '• Lat Pulldown — 3 sets x 10 reps',
    ],
  },
  {
    muscle: '🦵 Legs',
    color: '#80cbc4',
    exercises: [
      '• Squats — 3 sets x 15 reps',
      '• Lunges — 3 sets x 12 reps',
    ],
  },
  {
    muscle: '🦾 Arms',
    color: '#ffb74d',
    exercises: [
      '• Biceps Curl — 3 sets x 12 reps',
      '• Triceps Dips — 3 sets x 12 reps',
    ],
  },
];

export default function WorkoutScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏋️ Workout Plan</Text>
      <Text style={styles.subtitle}>Tap a muscle group to see exercises</Text>

      {workoutData.map((item, index) => (
        <View key={index} style={[styles.card, { borderColor: item.color }]}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => setSelected(selected === index ? null : index)}
          >
            <Text style={[styles.muscleText, { color: item.color }]}>
              {item.muscle}
            </Text>
            <Text style={[styles.arrow, { color: item.color }]}>
              {selected === index ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {selected === index && (
            <View style={styles.exerciseBox}>
              {item.exercises.map((ex, i) => (
                <Text key={i} style={styles.exerciseText}>{ex}</Text>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* Tip Box */}
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Tip</Text>
        <Text style={styles.tipText}>
          Rest 60–90 seconds between sets.{'\n'}
          Drink water before and after workout.{'\n'}
          Stay consistent for best results!
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/ProgressScreen')}
      >
        <Text style={styles.buttonText}>Next: Progress Tracker →</Text>
      </TouchableOpacity>
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
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  muscleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 16,
  },
  exerciseBox: {
    backgroundColor: '#111111',
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 4,
  },
  exerciseText: {
    fontSize: 15,
    color: '#cccccc',
    marginVertical: 5,
  },
  tipBox: {
    backgroundColor: '#1a2a1a',
    borderRadius: 12,
    padding: 16,
    marginTop: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#aaaaaa',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#e0ff4f',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});