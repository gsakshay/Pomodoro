import React from 'react'
import {View, StyleSheet} from 'react-native'

import {RoundedButton} from '../components/RoudedButton'

export const Timing = ({
  onChangeTime,
  time = 10
}) => {
  return(
    <View style = {styles.timingButton}>
      <RoundedButton size = {75} title ={String(time)} onPress={()=>onChangeTime(time)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center'
  }
})