// App.js

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import OutfitScreen from "./OutfitScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Gugi-Regular": require("./assets/fonts/Gugi-Regular.ttf"),
    "PlayfairDisplay-Bold":require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
    "PressStart2P-Regular": require("./assets/fonts/PressStart2P-Regular.ttf"),
    "RobotoCondensed-Regular": require("./assets/fonts/RobotoCondensed-Regular.ttf"),
    "VT323-Regular": require("./assets/fonts/VT323-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Outfit" component={OutfitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}