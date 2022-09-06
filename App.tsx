import React from "react";
import "react-native-gesture-handler";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import { SignIn } from "@screens/SignIn";
import { StatusBar } from "expo-status-bar";
export default function App() {
  useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <SignIn />
    </ThemeProvider>
  );
}
