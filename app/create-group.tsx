import { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router'

export default function CreateGroupScreen() {
  const [name, setName] = useState('')

  const createGroup = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const inviteCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()

    const { data } = await supabase
      .from('groups')
      .insert({
        name,
        created_by: user?.id,
        invite_code: inviteCode,
      })
      .select()
      .single()

    if (data) {
      await supabase.from('memberships').insert({
        group_id: data.id,
        user_id: user?.id,
        role: 'owner',
      })

      router.replace('/')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nazwa ekipy"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 12, marginBottom: 20 }}
      />
      <Button title="Utwórz ekipę" onPress={createGroup} />
    </View>
  )
}