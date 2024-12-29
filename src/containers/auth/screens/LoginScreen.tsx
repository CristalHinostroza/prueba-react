/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Button as RNButton, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets} from 'react-native-safe-area-context'
import { Button, COLORS, Input, makeHttpRequest, Spinner, URL_API_REST } from '@core'


export const LoginScreen = ({navigation}: any) => {
    const {top} =useSafeAreaInsets()
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('')
    /* console.log(email,password) */
    const [loading, setLoading] = useState(false)
   async function onSubmit(){
        if (!email || !password){
            Alert.alert('Error', 'Todos los campos son obligatorios')
            return
        }
        setLoading (true)
       try{
         await makeHttpRequest({
            host: URL_API_REST,
            method:'POST',
            path:'/login',
            body: {
                email:email.toLocaleLowerCase(),
                password,
            },
        })
        navigation.navigate('MainApp')
       }catch (error){
        Alert.alert('error', error.message)
       }
       setLoading(false)

    }

  return (
    <View style={[styles.container, { paddingTop: top + 100}]}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Input value={email} onChange={setEmail}></Input>
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <Input value={password} onChange={setPassword}></Input>
        </View>
        <View style={styles.buttonsContainers}>
            {loading ? (<Spinner/>) : (<Button title='Iniciar sesión' onPress={onSubmit}></Button>)}
            
            <RNButton title='Crear cuenta' onPress={()=> null}></RNButton>
        </View>

        </View>
      
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 16,
        backgroundColor: COLORS.complementary,
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