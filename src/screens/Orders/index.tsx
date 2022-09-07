import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "@hooks/auth";

import { OrderCard, OrderProps } from "@components/OrderCard";
import { ItemSeparator } from "@components/ItemSeparator";
import { Container, Header, Title } from "./styles";

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshopt) => {
        const data = querySnapshopt.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];
        setOrders(data);
      });
    return () => subscribe();
  }, []);

  function handlePizzaDelivered(id: string) {
    Alert.alert("Pedido", "Confirmar a entrega da pizza?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          firestore().collection("orders").doc(id).update({
            status: "Entregue",
          });
        },
      },
    ]);
  }
  return (
    <Container>
      <Header>
        <Title>Pedidos Feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            disabled={item.status === "Entregue"}
            index={index}
            data={item}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 125,
        }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
