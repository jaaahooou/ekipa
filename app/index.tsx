import { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { supabase } from '../lib/supabase'


export default function Index() {
  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } =
        await supabase.auth.getSession()

      setIsLoggedIn(!!data.session)
    }

    checkSession()
  }, [])

  if (isLoggedIn === null) {
    return null
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />
  }

  return <Redirect href="/groups" />
}