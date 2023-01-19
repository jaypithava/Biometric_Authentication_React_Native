import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [isBiometricSupported, SetIsBiometricSupported] = useState(false);

  //Face detection and Fingerprint Scan
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      SetIsBiometricSupported(compatible);
    })();
  });

  const fallBackToDefaultAuth = () => {
    console.log("Fallback to password authentication");
  };

  const alertComponent = (title, mess, btnText, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnText,
        onPress: btnFunc,
      },
    ]);
  };

  const TwoButtonAlert = () => {
    Alert.alert("Welcome To Biometric", "Jay", [
      {
        text: "Back",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    if (!isBiometricAvailable)
      return alertComponent(
        "Please Enter Your Password",
        "Biometric Authentication Not Supported",
        "Ok",
        () => fallBackToDefaultAuth()
      );

    //Check Biometric Type Available
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    //Check biometric type available in user's Device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        "Biometric Record Not Found",
        "Please Enter Your Password",
        "Ok",
        () => fallBackToDefaultAuth()
      );

    //Authenticate With Biometric
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometric Authentication",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    //Log The User On Success
    if (biometricAuth) {
      TwoButtonAlert();
    }
    console.log(isBiometricAvailable);
    console.log(supportedBiometrics);
    console.log(savedBiometrics);
    console.log(biometricAuth);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>
          {isBiometricSupported
            ? "Your Device Compatible with Biometric Authentication"
            : "Face or Fingerprint Available on this device"}
        </Text>
        <TouchableHighlight>
          <Button
            title='Login With Biometrics'
            color='black'
            onPress={handleBiometricAuth}
          />
        </TouchableHighlight>
        <StatusBar style='auto' />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent:'center',
    alignContent: 'center',
  },
});
