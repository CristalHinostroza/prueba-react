/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Button as RNButton } from 'react-native'
import React from 'react'
import { useSafeAreaInsets} from 'react-native-safe-area-context'
import { Button, COLORS, Input } from '@core'

export const LoginScreen = () => {
    const {top} =useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: top + 100}]}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Input value='' onChange={()=> null}></Input>
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <Input value='' onChange={()=> null}></Input>
        </View>
        <View style={styles.buttonsContainers}>
            <Button title='Iniciar sesión' onPress={()=> null}></Button>
            <RNButton title='Crear cuenta' onPress={()=> null}></RNButton>
        </View>

        </View>
      
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 16,
        backgroundColor: COLORS.theriary,
        gap: 24,
    },
    title: {
        fontSize:24,
        fontFamily: 'PlaypenSans-Bold',
        textAlign: 'center',
        marginBottom:90,
        

    },
    inputContainer:{},
    label:{
        fontSize: 16,
        fontFamily:'Regular-Bold',
        marginBottom:8,

    },
    buttonsContainers:{
        marginTop: 60,
        gap: 24,

    }
})