import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Alert } from 'react-native'
import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import { loadPlants, PlantProps, removePlant } from '../libs/storage'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import waterDropImg from '../assets/waterdrop.png'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    async function loadPlantsFromStorage() {
      const plants = await loadPlants()
      const nextWateringPlant = plants[0]
      const nextTime = formatDistance(
        new Date(nextWateringPlant.dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )
      setNextWatered(
        `Não esqueça de regar a ${nextWateringPlant.name} em ${nextTime}.`
      )
      setMyPlants(plants)
      setLoading(false)
    }

    loadPlantsFromStorage()
  }, [])

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel',
      },
      {
        text: 'Sim 🥲',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlants((oldValue) =>
              oldValue.filter((item) => item.id !== plant.id)
            )
          } catch (error) {
            Alert.alert(`Não foi possível remover a ${plant.name}! 😥`)
          }
        },
      },
    ])
  }

  if (loading) return <Load />
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image source={waterDropImg} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        ></FlatList>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 110,
  },
  spotlightImage: {
    height: 60,
    width: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginVertical: 20,
  },
})
