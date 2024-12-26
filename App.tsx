import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { COLORS, Spinner } from '@core'
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
      <Button
        title='Presioname'
        onPress={() => Alert.alert('Hola niños')}></Button>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          padding: 12,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={() => Alert.alert('Hola niños')}>
        <Text style={{ color: COLORS.complementary, fontSize: 24 }}>
          hola soy un boton{' '}
        </Text>
      </TouchableOpacity>
      <ActivityIndicator size='large' color='blue'></ActivityIndicator>
      <TextInput
        style={{
          backgroundColor: 'grey',
          width: 300,
          padding: 16,
        }}></TextInput>
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
