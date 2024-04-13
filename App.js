import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/homescreen";
import Secim from "./src/screens/secim";
import Anket from "./src/screens/anket";
import Sonuclar from "./src/screens/sonuclar";


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationCuontainer>
      <Stack.Navigator initialRouteName="Seçim 2024">
        <Stack.Screen name="Seçim 2024" component={HomeScreen} options={ {headerShown: false}}/>
        <Stack.Screen name="Ana Sayfa" component={Secim} options={ {headerShown: false}} />
        <Stack.Screen name="Anket" ponent={Anket} options={{ headerShown: false}} />
        <Stack.Screen name="Sonuçlar" component={Sonuclar} options={{ headerShown: false}} />

      </Stack.Navigator>
    </NavigationCuontainer>
  );
}

