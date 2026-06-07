import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

type MarkedDates = Record<string, any>

export default function CalendarScreen() {
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({})
  const [rangeStart, setRangeStart] = useState<string | null>(null)

  const markSingleDate = (date: string) => {
    setSelectedDates((prev) => {
      const updated = { ...prev }

      if (updated[date]) {
        delete updated[date]
      } else {
        updated[date] = {
          selected: true,
          selectedColor: '#4CAF50',
        }
      }

      return updated
    })
  }

  const markRange = (start: string, end: string) => {
    const updated: MarkedDates = {}

    let current = new Date(start)
    const last = new Date(end)

    while (current <= last) {
      const dateStr = current.toISOString().split('T')[0]
      updated[dateStr] = {
        selected: true,
        selectedColor: '#4CAF50',
      }
      current.setDate(current.getDate() + 1)
    }

    setSelectedDates((prev) => ({
      ...prev,
      ...updated,
    }))
  }

  const handleDayPress = (day: any) => {
    const date = day.dateString

    if (rangeStart) {
      markRange(rangeStart, date)
      setRangeStart(null)
    } else {
      markSingleDate(date)
    }
  }

  const handleDayLongPress = (day: any) => {
    setRangeStart(day.dateString)
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Kiedy możesz? 📅
      </Text>

      <Calendar
        markedDates={selectedDates}
        onDayPress={handleDayPress}
        onDayLongPress={handleDayLongPress}
      />

      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 18 }}>
          👆 Tap = pojedynczy dzień
        </Text>
        <Text style={{ fontSize: 18, marginTop: 8 }}>
          ✋ Long press + tap = zakres dni
        </Text>
      </View>
    </ScrollView>
  )
}