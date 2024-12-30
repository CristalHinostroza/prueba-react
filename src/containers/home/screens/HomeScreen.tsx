/* eslint-disable prettier/prettier */
import { Alert, Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS, makeHttpRequest, URL_API_REST, URL_API_USER } from '@core'



    interface User {
      last_name: string;
      avatar: any;
      id: number; 
      first_name: string;
      email: string;
    }

export const HomeScreen = () => {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [first_name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [editedUserId, setEditedUserId] = useState<number | null>(null);

  useEffect(()=>{
    makeHttpRequest({
      host:URL_API_USER,
      path: '/users?page=1',
      method:'GET',
    
    })
    .then (Response => setUsers(Response.data))
    .catch (error => Alert.alert('Ha ocurrido un error', error.message))
},[])
/* console.log(JSON.stringify(users, null,2)) */

  const {top}= useSafeAreaInsets()



  // Función para eliminar un usuario
  function deleteUserById (id: number) {
    setLoading (true);
    makeHttpRequest({
      host: URL_API_REST,
      path:'/user/2',
      method:'DELETE',
    })
    .then (()=>{
      const updateUsers = users.filter (user => user.id!==id)
      setUsers (updateUsers)
    })
    /* .catch (error => Alert.alert('Ha ocurrido un error', error.message)) */
    . finally(()=> setLoading(false))
    setUsers(users.filter((user) => user.id !== id));
  }; 
  function saveUser() {
    if (!first_name || !lastName || !email) {
      Alert.alert("Por favor completa todos los campos.");
      return;
    }
  
    const userPayload = {
      first_name: first_name,
      last_name: lastName,
      email,
      avatar: "https://via.placeholder.com/80", // Avatar genérico
    };
  
    if (editedUserId) {
      // Actualizar usuario
      makeHttpRequest({
        host: URL_API_REST,
        path: `/user/${editedUserId}`,
        method: "PUT",
        body: userPayload,
      })
        .then(() => {
          const updatedUsers = users.map((user) =>
            user.id === editedUserId ? { ...user, ...userPayload } : user
          );
          setUsers(updatedUsers);
          resetForm();
        })
        .catch((error) => Alert.alert("Ha ocurrido un error", error.message));
    } else {
      // Crear usuario
      makeHttpRequest({
        host: URL_API_REST,
        path: "/users",
        method: "POST",
        body: userPayload,
      })
        .then((response) => {
          setUsers([...users, { ...response.data, id: Date.now() }]);
          resetForm();
        })
        .catch((error) => Alert.alert("Ha ocurrido un error", error.message));
    }
  }
  function editUser(user: User) {
    setName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setEditedUserId(user.id);
  }
  // Función para restablecer el formulario
function resetForm() {
  setName("");
  setLastName("");
  setEmail("");
  setEditedUserId(null);
}


   
  return (
    <View style={[styles.container, { paddingTop: 30 }]}>
    <Text style={styles.title}>Gestión de Usuarios</Text>
      <Text style={styles.subtitle}>
        {editedUserId ? "Editar Usuario" : "Agregar Usuario"}
      </Text>
        {/* Formulario */}
        <TextInput
        placeholder="Nombre"
        value={first_name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
       <View style={styles.userActions}>
        <TouchableOpacity
        style={styles.saveButton}
        onPress={saveUser}
      >
        <Text style={styles.saveButtonText}>
          {editedUserId ? "Actualizar" : "Agregar"}
        </Text>
      </TouchableOpacity>
      {editedUserId && (
        <TouchableOpacity
        style={styles.cancelButton}
        onPress={resetForm}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
     
      
      )}
       </View>
      <FlatList
      data ={users}
      renderItem={({item})=>(
        <View style={styles.user}>
        {/* Imagen del usuario */}
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        /> 
        {/* Información del usuario */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={styles.email}>{item.email}</Text>
          <View style={styles.userActions}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteUserById(item.id)}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editUser(item)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      
        </View>
      </View>

      )}
      ></FlatList>

    
  </View>
  );
};



const styles = StyleSheet.create({
    container:{
            flex:1,
            padding: 10,
            backgroundColor: COLORS.complementary,
            paddingHorizontal:10,
           /*  gap: 24, */
          /*  marginLeft: 10,
           marginRight: 10, */
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
        input: { 
          borderWidth: 1, 
          marginBottom: 10, 
          padding: 8 ,
          borderRadius: 5,
          borderColor:  "#ccc",
          backgroundColor: COLORS.complementary,
        },
        user: {
          flexDirection:'row', // Coloca la imagen y la información en una fila
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
      
        }, 
        userInfo: {
          flex:1, // Ocupa el resto del espacio disponible
          marginLeft: 30,
        },
        name: { fontWeight: "bold" , fontSize: 16, color: "#344E41"},
        email: { color:  "#6B7280", fontSize: 14 },
       
         buttonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        }, 
        avatar: {
          width: 50,
          height: 50,
          borderRadius: 40,
          marginRight: 10,
        },
        userActions: {
          flexDirection: "row", // Alinea los botones horizontalmente
          justifyContent: "space-between", // Espaciado entre los botones
          marginTop: 10,
        },
        deleteButton: {
          backgroundColor: "#FF6B6B",
          padding: 10,
          borderRadius: 5,
          flex: 1, // Ocupa el mismo espacio que el botón "Editar"
          marginRight: 5, // Espacio entre los botones
        },
        deleteButtonText: {
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
        },
        editButton: {
          backgroundColor: "#A1C298",
          padding: 10,
          borderRadius: 5,
          flex: 1, // Ocupa el mismo espacio que el botón "Eliminar"
        },
        editButtonText: {
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
        },
        saveButton: {
          backgroundColor: "#4CAF50", // Verde para Agregar/Actualizar
          padding: 12,
          alignContent: 'center',
          borderRadius: 8,
          alignItems: "center",
          marginVertical: 10,
          width: 100,
        },
        saveButtonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
        cancelButton: {
          backgroundColor: "#FF6B6B", // Rojo para Cancelar
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginVertical: 10,
          width: 100,
        },
        cancelButtonText: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
        },
      
})

function resetForm() {
  throw new Error('Function not implemented.');
}
