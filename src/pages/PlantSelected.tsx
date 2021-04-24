import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { SvgFromUri } from 'react-native-svg'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { Button } from '../components/Button'
import { loadPlants, PlantProps, savePlant } from '../libs/storage'
import waterDropImg from '../assets/waterdrop.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  plant: PlantProps
}

export function PlantSelected() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')
  const route = useRoute()
  const { plant } = route.params as Params
  const navigation = useNavigation()

  function handleDateTimeChanged(_: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') setShowDatePicker((oldState) => !oldState)

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert('Escolha uma hora do futuro! ⏰')
    }

    if (dateTime) setSelectedDateTime(dateTime)
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState)
  }

  async function handleSave() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime })
      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle:
          'Fique tranquilo que sempre vamos \n lembrar você de cuidar da sua plantinha \n com bastante amor.',
        buttonText: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      })
    } catch (error) {
      Alert.alert('Não foi possível salvar 😥')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>
      <View style={styles.controllers}>
        <View style={styles.tipContainer}>
          <Image source={waterDropImg} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode='time'
            display='spinner'
            onChange={handleDateTimeChanged}
          />
        )}
        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>{`Mudar ${format(
              selectedDateTime,
              'HH:mm'
            )}`}</Text>
          </TouchableOpacity>
        )}
        <Button text='Cadastrar planta' onPress={handleSave} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.shape,
    justifyContent: 'space-between',
  },
  plantInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: colors.shape,
  },
  plantName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginTop: 15,
  },
  plantAbout: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
  },
  controllers: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
    backgroundColor: colors.white,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    color: colors.blue,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel: {
    color: colors.heading,
    fontFamily: fonts.complement,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 24,
  },
})
