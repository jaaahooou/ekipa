import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="groups" />
      <Stack.Screen name="create-group" />
      <Stack.Screen name="join-group" />
      <Stack.Screen name="group/[id]" />
    </Stack>
  )
}