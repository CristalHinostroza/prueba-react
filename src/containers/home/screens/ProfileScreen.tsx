/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@core'

export const ProfileScreen = () => {
  const {top}= useSafeAreaInsets()
  return (
    <View style={[styles.container, {paddingTop: top  }]}>
      <Button title='Cerrar sesión' onPress={()=>null}></Button>
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:'center', 
    alignItems:'center',
    
  }
})