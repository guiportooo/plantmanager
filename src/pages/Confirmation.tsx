import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  title: string
  subtitle: string
  buttonText: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  smile: '😄',
  hug: '🤗',
}

export function Confirmation() {
  const navigation = useNavigation()
  const routes = useRoute()
  const {
    title,
    subtitle,
    buttonText,
    icon,
    nextScreen,
  } = routes.params as Params

  function handleNavigation() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button text={buttonText} onPress={handleNavigation} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    marginTop: 15,
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
})
