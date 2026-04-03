import { ScrollView, View, Text } from 'react-native'

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
        Cześć, Ekipa 👋
      </Text>

      <View
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 16,
          backgroundColor: '#eee',
        }}
      >
        <Text>Następny trip</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Barcelona 🇪🇸
        </Text>
      </View>
    </ScrollView>
  )
}