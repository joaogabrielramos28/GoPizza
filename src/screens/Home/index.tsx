import React, { useCallback, useEffect, useState } from "react";
import happyEmoji from "@assets/happy.png";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  NewProductButton,
  Title,
} from "./styles";
import { useTheme } from "styled-components/native";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";

import firestore from "@react-native-firebase/firestore";
import { useAuth } from "@hooks/auth";

export function Home() {
  const { signOut, user } = useAuth();
  const { COLORS } = useTheme();
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta.")
      );
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  function handleSearch() {
    fetchPizzas(search);
  }
  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? "product" : "order";
    navigation.navigate(route, { id });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  const userName = user?.isAdmin ? "Admin" : "Garçom";

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, {userName}</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search
        onSearch={handleSearch}
        onClear={handleSearchClear}
        onChangeText={setSearch}
        value={search}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{`${pizzas.length} ${
          pizzas.length > 1 ? "pizzas" : "pizza"
        }`}</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      {user?.isAdmin && (
        <NewProductButton
          title="Cadastrar Pizza"
          type="secondary"
          onPress={handleAdd}
        />
      )}
    </Container>
  );
}
