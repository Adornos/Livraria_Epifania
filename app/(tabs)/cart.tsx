import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Duna",
      author: "Frank Herbert",
      price: 59.90,
      image: require("../../components/imgs/books/book.jpg"),
      quantity: 1,
    },
    {
      id: "2",
      title: "Fundação",
      author: "Isaac Asimov",
      price: 49.90,
      image: require("../../components/imgs/books/book.jpg"),
      quantity: 2,
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.bookImage} />

      <View style={{ flex: 1 }}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPrice}>R$ {item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.removeButton}
      >
        <Text style={{ color: "#980225", fontWeight: "bold" }}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  bookImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  bookTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bookAuthor: {
    color: "#aaa",
    fontSize: 14,
  },
  bookPrice: {
    color: "#980225",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#980225",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#000", // Changed from "#333" to "#000" or any other appropriate color
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#980225",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
