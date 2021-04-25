import * as Notifications from 'expo-notifications'
import { PlantProps } from './interfaces'

export async function scheduleNotification(plant: PlantProps): Promise<string> {
  const nextTime = new Date(plant.dateTimeNotification)
  const now = new Date()

  const { times, repeat_every } = plant.frequency

  if (repeat_every === 'week') {
    const interval = Math.trunc(7 / times)
    nextTime.setDate(now.getDate() + interval)
  } else {
    nextTime.setDate(nextTime.getDate() + 1)
  }

  const seconds = Math.abs(
    Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
  )

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Heeey, 🌱',
      body: `Está na hora de cuidar da sua ${plant.name}`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: {
        plant,
      },
    },
    trigger: {
      seconds: seconds < 60 ? 60 : seconds,
      repeats: true,
    },
  })
}

export async function cancelScheduling(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId)
}

export function subscribeToNotifications() {
  return Notifications.addNotificationReceivedListener(async (notification) => {
    const data = notification.request.content.data.plant as PlantProps
    console.log(data)
  })
}
