import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Kalendarz' }} />
      <Tabs.Screen name="ideas" options={{ title: 'Pomysły' }} />
      <Tabs.Screen name="polls" options={{ title: 'Ankiety' }} />
      <Tabs.Screen name="chat" options={{ title: 'Czat' }} />
    </Tabs>
  )
}