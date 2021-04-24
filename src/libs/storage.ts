import { format } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage'
export interface PlantProps {
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
  dateTimeNotification: Date
  hour: string
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps
  }
}

export async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

    return Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            'HH:mm'
          ),
        }
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      )
  } catch (error) {
    throw new Error(error)
  }
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    }
    await AsyncStorage.setItem(
      '@plantmanager:plants',
      JSON.stringify({ ...newPlant, ...plants })
    )
  } catch (error) {
    throw new Error(error)
  }
}

export async function removePlant(id: number): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants')
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
  delete plants[id]
  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))
}
