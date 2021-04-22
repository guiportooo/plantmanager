import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { EnvironmentButton } from '../components/EnvironmentButton'
import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'
import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentProps {
  key: string
  title: string
}

interface PlantProps {
  id: number
  name: string
  about: string
  water_tips: string
  photo: string
  environments: [string]
  frequency: {
    times: number
    repeat_every: string
  }
}

export function PlantSelection() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('all')
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  function handleEnvironmentSelected(environment: string) {
    setSelectedEnvironment(environment)

    if (environment === 'all') {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    )
    setFilteredPlants(filtered)
  }
  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    )

    if (!data) setLoading(true)

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data])
      setFilteredPlants((oldValue) => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }
    setLoading(false)
    setLoadingMore(false)
  }

  function handleLoadMorePlants(distance: number) {
    if (distance < 1) return

    setLoadingMore(true)
    setPage((oldValue) => oldValue + 1)
    fetchPlants()
  }

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get(
        'plants_environments?_sort=title&_order=asc'
      )
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ])
    }

    fetchEnvironments()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  if (loading) return <Load />
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              text={item.title}
              key={item.key}
              active={item.key === selectedEnvironment}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        ></FlatList>
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleLoadMorePlants(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        ></FlatList>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})