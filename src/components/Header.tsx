import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import userImg from '../assets/profile.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Guilherme</Text>
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
