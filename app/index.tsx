import { ScrollView, Text, View } from 'react-native'

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        Cześć, Ekipa 👋
      </Text>

      <View
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 18,
          backgroundColor: '#f2f2f2',
        }}
      >
        <Text>Następny wspólny termin</Text>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
          15–17 maja
        </Text>
      </View>

      <View
        style={{
          marginTop: 16,
          padding: 20,
          borderRadius: 18,
          backgroundColor: '#e7f0ff',
        }}
      >
        <Text>Aktywna ankieta</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Barcelona 🇪🇸 vs Berlin 🇩🇪
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
    Inspiracje ✈️
  </Text>

  <View
    style={{
      marginTop: 12,
      padding: 18,
      borderRadius: 18,
      backgroundColor: '#fff',
    }}
  >
    <Text style={{ fontSize: 18 }}>🇮🇹 Rzym</Text>
    <Text>Koloseum • Pizza • City break</Text>
  </View>
</View>

<View
  style={{
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#fafafa',
  }}
>
  <Text>💬 Ania: Bikini na Barcelonę? 😎</Text>
</View>
    </ScrollView>
  )
}

