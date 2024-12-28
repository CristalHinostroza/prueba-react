/* eslint-disable prettier/prettier */
import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '@core'

/* const dummy_users=[
    {id:1, name:'Juanita Lopez', email:'juanita.l@test.com'},
    {id:2, name:'Joe Jonas', email:'joe.jonas@test.com'},
    {id:3, name:'Kim Kimmy', email:'kim.kim@test.com'},

] */
    interface User {
      id: string;
      name: string;
      email: string;
    }

export const HomeScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const {top}= useSafeAreaInsets()

  // Función para agregar un usuario
  const addUser = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Error", "Both name and email are required.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const newUser: User = { id: Date.now().toString(), name, email };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  // Función para eliminar un usuario
  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };


   
  return (
    <ScrollView contentContainerStyle={[styles.container, {paddingTop: top  }]}>
      <Text style={styles.title}>HomeScreen</Text>
      <Text style={styles.subtitle} >Agregar nuevos Usuarios</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Ingresa E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.user}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => deleteUser(item.id)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            
           
          </View>
        )}
      />
      {/* <FlatList data={dummy_users}
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
       

      </FlatList> */}
     
    </ScrollView>
  )
}



const styles = StyleSheet.create({
    container:{
            flex:1,
            padding: 20,
            backgroundColor: COLORS.complementary,
            gap: 24,
        },
        title: {
            fontSize:24,
            fontFamily: 'PlaypenSans-Bold',
            textAlign: 'center',
        },
        subtitle:{
          fontFamily:'PlaypenSans-Bold',

        },
        user: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
          padding: 10,
          backgroundColor:  "#FAF9F6",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
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
        button: {
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
          backgroundColor: "#FF6B6B", // Soft red aesthetic color for delete
        },
        buttonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
       
})