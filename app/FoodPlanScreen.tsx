import React from 'react';
import {
  View, Text, StyleSheet,
  ScrollView, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function FoodPlanScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const weight = parseFloat(params.weight as string);
  const height = parseFloat(params.height as string);
  const age    = parseFloat(params.age as string);
  const goal   = params.goal as string;

  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const bmiRounded = bmi.toFixed(1);

  // BMI category
  let bmiCategory = '';
  if (bmi < 18.5)      bmiCategory = 'Underweight';
  else if (bmi < 25)   bmiCategory = 'Normal';
  else if (bmi < 30)   bmiCategory = 'Overweight';
  else                 bmiCategory = 'Obese';

  // Food plan
  let foodList: string[] = [];
  let foodTitle = '';

  if (goal === 'Lose Weight') {
    foodTitle = '🥗 Lose Weight Food Plan';
    foodList = [
      '🍳 Eggs (boiled or scrambled)',
      '🥦 Vegetables (broccoli, spinach)',
      '🥗 Chicken salad',
      '🐟 Tuna (canned or grilled)',
      '🍎 Fresh fruit (apple, orange)',
      '💧 Drink lots of water',
    ];
  } else if (goal === 'Gain Muscle') {
    foodTitle = '💪 Gain Muscle Food Plan';
    foodList = [
      '🥣 Oats with banana',
      '🥛 Milk (full fat)',
      '🍗 Chicken breast',
      '🍚 White or brown rice',
      '🍝 Pasta with protein',
      '🍦 Greek yogurt',
      '🥜 Nuts and peanut butter',
    ];
  } else {
    foodTitle = '⚖️ Maintain Weight Food Plan';
    foodList = [
      '🍳 Eggs and whole wheat bread',
      '🍗 Grilled chicken',
      '🍚 Rice with vegetables',
      '🍲 Soup (vegetable or chicken)',
      '🥗 Mixed salad',
      '🍎 Fruit as snack',
    ];
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your BMI & Food Plan</Text>

      {/* BMI Box */}
      <View style={styles.bmiBox}>
        <Text style={styles.bmiLabel}>Your BMI</Text>
        <Text style={styles.bmiNumber}>{bmiRounded}</Text>
        <Text style={styles.bmiCategory}>{bmiCategory}</Text>
        <Text style={styles.bmiInfo}>
          Height: {height} cm | Weight: {weight} kg | Age: {age}
        </Text>
        <Text style={styles.bmiGoal}>Goal: {goal}</Text>
      </View>

      {/* BMI Scale */}
      <View style={styles.scaleBox}>
        <Text style={styles.scaleTitle}>BMI Scale:</Text>
        <Text style={styles.scaleText}>🔵 Under 18.5 → Underweight</Text>
        <Text style={styles.scaleText}>🟢 18.5 – 24.9 → Normal</Text>
        <Text style={styles.scaleText}>🟡 25 – 29.9 → Overweight</Text>
        <Text style={styles.scaleText}>🔴 30 and above → Obese</Text>
      </View>

      {/* Food Plan */}
      <View style={styles.foodBox}>
        <Text style={styles.foodTitle}>{foodTitle}</Text>
        {foodList.map((item, index) => (
          <Text key={index} style={styles.foodItem}>{item}</Text>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/WorkoutScreen')}
      >
        <Text style={styles.buttonText}>Next: Workout Plan →</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5a623',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  bmiBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f5a623',
  },
  bmiLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  bmiNumber: {
    color: '#f5a623',
    fontSize: 52,
    fontWeight: 'bold',
  },
  bmiCategory: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  bmiInfo: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
  },
  bmiGoal: {
    color: '#f5a623',
    fontSize: 13,
    marginTop: 4,
  },
  scaleBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  scaleTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 15,
  },
  scaleText: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 4,
  },
  foodBox: {
    backgroundColor: '#1a2a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  foodTitle: {
    color: '#4caf50',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  foodItem: {
    color: '#ddd',
    fontSize: 15,
    marginBottom: 8,
    paddingLeft: 4,
  },
  button: {
    backgroundColor: '#f5a623',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});