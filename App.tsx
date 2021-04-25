import React, { useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import Routes from './src/routes'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost'
import { subscribeToNotifications } from './src/libs/notifications'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  })

  useEffect(() => {
    const subscription = subscribeToNotifications()
    return () => subscription.remove()
  }, [])

  if (!fontsLoaded) return <AppLoading />

  return <Routes />
}
