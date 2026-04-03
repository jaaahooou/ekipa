import { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router'

export default function JoinGroupScreen() {
  const [code, setCode] = useState('')

  const joinGroup = async () => {
    const { data: group } = await supabase
      .from('groups')
      .select('*')
      .eq('invite_code', code.toUpperCase())
      .single()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (group) {
      await supabase.from('memberships').insert({
        group_id: group.id,
        user_id: user?.id,
      })

      router.replace('/')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Kod zaproszenia"
        value={code}
        onChangeText={setCode}
        style={{ borderWidth: 1, padding: 12, marginBottom: 20 }}
      />
      <Button title="Dołącz do grupy" onPress={joinGroup} />
    </View>
  )
}