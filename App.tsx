import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { StyleSheet, View } from 'react-native'
import { Button } from '@core'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

export default function App() {
  const [loaded, error] = useFonts({
    'PlaypenSans-Bold': require('./assets/fonts/PlaypenSans-Bold.ttf'),
    'PlaypenSans-Light': require('./assets/fonts/PlaypenSans-Light.ttf'),
    'Regular-Bold': require('./assets/fonts/PlaypenSans-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }
  return (
    <View style={styles.container}>
      {/*  <Text style={{ fontFamily: 'PlaypenSans-Bold', fontSize: 24 }}>
        Hola world!
      </Text>
      <Text style={{ fontFamily: 'PlaypenSans-Light', fontSize: 24 }}>
        Hola world!
      </Text>
      <Text style={{ fontFamily: 'PlaypenSans-Regular', fontSize: 24 }}>
        Hola world!
      </Text> */}
      {/* <ActivityIndicator size='large' color='blue'></ActivityIndicator>
      <TextInput
        style={{
          backgroundColor: 'grey',
          width: 300,
          padding: 16,
        }}></TextInput> */}
      <Button title='holaaa' onPress={() => console.log('hello')}></Button>
      <StatusBar style='auto' />
      {/* <Spinner /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
})
