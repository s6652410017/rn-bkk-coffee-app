import {
  Kanit_400Regular,
  Kanit_600SemiBold,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  //setFont for the page
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
    Kanit_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "Top 10 Bangkok Coffee",
          headerTitleStyle: {
            fontFamily: "Kanit_600SemiBold",
            color: "#ddd7d3",
          },
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียด",
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#00ffdd",
          },
        }}
      />
    </Stack>
  );
}
