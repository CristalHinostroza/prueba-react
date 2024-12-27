/* eslint-disable prettier/prettier */
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '@core'

const dummy_users=[
    {id:1, name:'Juanita Lopez', email:'juanita.l@test.com'},
    {id:2, name:'Joe Jonas', email:'joe.jonas@test.com'},
    {id:3, name:'Kim Kimmy', email:'kim.kim@test.com'},

]

export const HomeScreen = () => {
    const {top}= useSafeAreaInsets()
  return (
    <ScrollView contentContainerStyle={[styles.container, {paddingTop: top  }]}>
      <Text style={styles.title}>HomeScreen</Text>
      <Text >Lista de Usuarios</Text>
      <FlatList data={dummy_users}
      renderItem={({item})=>(
        <View style={{flexDirection:'row', gap:10 }}>
            <Text style={{}}>{item.name}</Text>
            <Text style={{}}>{item.email}</Text>
            <TouchableOpacity>
                <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Eliminar</Text>
            </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{gap:30}}>
       

      </FlatList>
     
    </ScrollView>
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
            
    
        },
       
})