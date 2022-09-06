import React from "react";
import happyEmoji from "@assets/happy.png";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
} from "./styles";
import { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Search } from "@components/Search";

export function Home() {
  const { COLORS } = useTheme();
  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search onSearch={() => {}} onClear={() => {}} />
    </Container>
  );
}
