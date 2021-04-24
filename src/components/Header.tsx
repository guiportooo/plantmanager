import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import userImg from '../assets/profile.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function getUserNameFromStorage() {
      try {
        const user = await AsyncStorage.getItem('@plantmanager:user')
        setUserName(user || '')
      } catch (error) {
        Alert.alert('Não foi possível identificar seu nome 😥')
      }
    }

    getUserNameFromStorage()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={userImg} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 32,
  },
  userName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
})
