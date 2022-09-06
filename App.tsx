import "react-native-gesture-handler";
import React from "react";
import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";

import { SignIn } from "@screens/SignIn";
import { Product } from "@screens/Product";
import { AuthProvider } from "@hooks/auth";
import { Home } from "@screens/Home";

export default function App() {
  const [isLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <AuthProvider>
        <Home />
      </AuthProvider>
    </ThemeProvider>
  );
}
