import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Orders } from "@screens/Orders";
import { Home } from "@screens/Home";
import { useTheme } from "styled-components/native";

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const { COLORS } = useTheme();
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Orders" component={Orders} />
    </Navigator>
  );
}
