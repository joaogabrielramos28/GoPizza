import React from "react";
import happyEmoji from "@assets/happy.png";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  Title,
} from "./styles";
import { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Search } from "@components/Search";
import { ProductCard } from "@components/ProductCard";

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

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <ProductCard
        data={{
          id: 1,
          name: "Pizza",
          description: "12312312312",
          photo_url: "https://github.com/joaogabrielramos28.png",
        }}
      />
    </Container>
  );
}
