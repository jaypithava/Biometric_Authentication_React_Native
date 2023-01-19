import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button ,Alert , TouchableHighlight } from 'react-native';
import { useState , useEffect  } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';


export default function App() {
const[isBiometricSupported, SetIsBiometricSupported] = useState(false)

//Face detection and Fingerprint Scan
useEffect(() => {
  (async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    SetIsBiometricSupported(compatible)
  })
},[])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
