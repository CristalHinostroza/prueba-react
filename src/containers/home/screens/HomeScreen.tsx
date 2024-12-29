/* eslint-disable prettier/prettier */
import { Alert, Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS, makeHttpRequest, URL_API_REST, URL_API_USER } from '@core'


/* const dummy_users=[
    {id:1, name:'Juanita Lopez', email:'juanita.l@test.com'},
    {id:2, name:'Joe Jonas', email:'joe.jonas@test.com'},
    {id:3, name:'Kim Kimmy', email:'kim.kim@test.com'},

] */
    interface User {
      last_name: string;
      avatar: Image;
      id: number; 
      first_name: string;
      email: string;
    }

export const HomeScreen = () => {
  /* const [name, setName] = useState<string>(""); */
/*   const [email, setEmail] = useState<string>("");
 */
  const [users, setUsers] = useState<User[]>([]);

  useEffect(()=>{
    makeHttpRequest({
      host:URL_API_USER,
      path: '/users?page=1',
      method:'GET',
    
    })
    .then (Response => setUsers(Response.data))
    .catch (error => Alert.alert('Ha ocurrido un error', error.message))
},[])
console.log(JSON.stringify(users, null,2))


 /*  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }; */
  const {top}= useSafeAreaInsets()

  // Función para agregar un usuario
 /*  const addUser = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Both name and email are required.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    } */

   /*  const newUser: User = { id: Date.now().toString(), name, email };
    setUsers([...users, newUser]);
    setName("");
    setEmail(""); */
  /* }; */

  // Función para eliminar un usuario
  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => users.id !== id));
  }; 


   
  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: 20 }]}>
    <Text style={styles.title}>HomeScreen</Text>
    <Text style={styles.subtitle}>Agregar nuevos Usuarios</Text>
    

      {users.map(user => (
        <View style={styles.user}>
        {/* Imagen del usuario */}
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        {/* Información del usuario */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      ))}
    
  </ScrollView>
  );
};



const styles = StyleSheet.create({
    container:{
            flex:1,
            padding: 10,
            backgroundColor: COLORS.complementary,
           /*  gap: 24, */
           marginLeft: 10,
           marginRight: 10,
        },
       
        title: {
            fontSize:24,
            fontFamily: 'PlaypenSans-Bold',
            textAlign: 'center',
            marginBottom: 10,
        },
        subtitle:{
          fontFamily:'PlaypenSans-Bold',

        },
        user: {
          flexDirection: 'row', // Coloca la imagen y la información en una fila
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
      
        }, 
        userInfo: {
          flex: 1, // Ocupa el resto del espacio disponible
          marginLeft: 30,
        },
        name: { fontWeight: "bold" , fontSize: 16, color: "#344E41"},
        email: { color:  "#6B7280", fontSize: 14 },
       
        input: { 
          borderWidth: 1, 
          marginBottom: 10, 
          padding: 8 ,
          borderRadius: 5,
          borderColor:  "#ccc",
          backgroundColor: COLORS.complementary,
        },
       /*  button: {
          backgroundColor: "#A1C298", // Soft green aesthetic color
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        },
        deleteButton: {
          flexDirection: 'row', 
          backgroundColor: "#FF6B6B", // Soft red aesthetic color for delete
          padding: 8,
          borderRadius:8,
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        }, */
        avatar: {
          width: 80,
          height: 80,
          borderRadius: 40,
          marginBottom: 10,
        },
       
})