import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Animated from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import { SvgFromUri } from 'react-native-svg'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string
    photo: string
    hour: string
  }
  handleRemove: () => void
}

export const PlantCardSecondary = ({
  data,
  handleRemove,
  ...rest
}: PlantCardSecondaryProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name='trash' size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.text}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar em</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  text: {
    color: colors.heading,
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginLeft: 10,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    color: colors.body_light,
    fontFamily: fonts.text,
    fontSize: 16,
  },
  time: {
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 16,
    marginTop: 5,
  },
  buttonRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    borderRadius: 20,
    width: 100,
    height: 85,
    marginTop: 15,
    position: 'relative',
    right: 20,
    paddingLeft: 15,
  },
})
