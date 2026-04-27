import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="UserInfoScreen" options={{ headerShown: false }} />
      <Stack.Screen name="FoodPlanScreen" options={{ headerShown: false }} />
      <Stack.Screen name="WorkoutScreen" options={{ headerShown: false }} />
    </Stack>
  );
}