import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentitfication'
import { Confirmation } from '../pages/Confirmation'
import { PlantSelection } from '../pages/PlantSelection'
import colors from '../styles/colors'
import { PlantSelected } from '../pages/PlantSelected'
import { MyPlants } from '../pages/MyPlants'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name='Welcome' component={Welcome} />
    <stackRoutes.Screen
      name='UserIdentification'
      component={UserIdentification}
    />
    <stackRoutes.Screen name='Confirmation' component={Confirmation} />
    <stackRoutes.Screen name='PlantSelection' component={PlantSelection} />
    <stackRoutes.Screen name='PlantSelected' component={PlantSelected} />
    <stackRoutes.Screen name='MyPlants' component={MyPlants} />
  </stackRoutes.Navigator>
)

export default AppRoutes
