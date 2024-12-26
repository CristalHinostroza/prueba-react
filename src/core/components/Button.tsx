/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

interface ButtonProps{
    title: string
    onPress: ()=> void
}
export const Button = ({title, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  txt:{
    color: COLORS.complementary, 
    fontSize: 24 
  }
})
