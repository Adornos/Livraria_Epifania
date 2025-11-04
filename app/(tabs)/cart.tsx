import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ctn from '../../constants/containers';
import T from '../../constants/topography';
import C from '../../constants/colors';
import Logo from '../../components/logo';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image?: any;
  details?: string;
  quantity?: number;
}

interface Cart {
  items: CartItem[];
  total?: number;
}

const initialCart: Cart = {
  items: [
    {
      id: '1',
      title: 'O Pequeno Príncipe',
      price: 39.9,
      image: require('../../components/imgs/books/book.jpg'),
      details: 'Capa: D | Lingua: BR',
      quantity: 1,
    },
    {
      id: '2',
      title: 'Dom Casmurro',
      price: 29.5,
      image: require('../../components/imgs/books/book.jpg'),
      details: 'Capa: D | Lingua: BR',
      quantity: 2,
    }
  ],
};

export default function CartPage() {

  const updateCartQuantity = (itemId: string, increment: boolean) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((it) =>
        it.id === itemId
          ? { ...it, quantity: increment ? (it.quantity ?? 1) + 1 : Math.max(1, (it.quantity ?? 1) - 1) }
          : it
      ),
    }));
  };

  const removeItemFromCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== itemId),
    }));
  };

  const [cart, setCart] = useState<Cart>(initialCart);

  const formatBRL = (value: number) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  const total = cart.items.reduce(
    (sum, it) => sum + it.price * (it.quantity ?? 1),
    0
  );

  return (
    <>
    <SafeAreaView style={{flex: 1 }}>
      <View style={Ctn.homeContainer}>
        <Text style={T.h1}>Carrinho</Text>
  
        {cart.items.map((item) => (
          <View key={item.id} style={Ctn.cartItemContainer}>
            <View style={Ctn.cartImageContainer}>
              <Image
                source={item.image}
                style={Ctn.cartImage}
                resizeMode="contain"
              />
            </View>
  
            <View style={[Ctn.cartDetailsContainer]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Text style={[T.p, {flexShrink: 1, color: C.backgroundPrim}]} numberOfLines={2}>{item.title}</Text>
                <TouchableOpacity
                  hitSlop={8}
                  onPress={() => removeItemFromCart(item.id)}
                  >
                  <MaterialCommunityIcons name="close" size={24} color={C.backgroundPrim} />
                </TouchableOpacity>
                  
              </View>
  
              <Text style={[T.h3, {color: C.backgroundPrim}, T.bold]}>{formatBRL(item.price)}</Text>
  
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
              <Text style={[T.caption, T.muted]} numberOfLines={2}> {item.details} </Text>
  
  
              <View style={Ctn.itemQuantityContainer}>
                <TouchableOpacity
                  hitSlop={10}
                  onPress={() => updateCartQuantity(item.id, false)}
                >
                  <MaterialCommunityIcons name="minus" size={18} color={C.textSec} />
                </TouchableOpacity>
  
                <Text style={[T.p, {color: C.textSec}]}>{item.quantity ?? 1}</Text>
  
                <TouchableOpacity
                  hitSlop={10}
                  onPress={() => updateCartQuantity(item.id, true)}
                >
                  <MaterialCommunityIcons name="plus" size={18} color={C.textSec} />
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>
        ))}
  
        <View style={Ctn.footerContainer}>
          <Text style={T.h2}>Total: {formatBRL(total)}</Text>
          <TouchableOpacity
            style={[
              Ctn.submitButton,
              { marginTop: 24, width: '84%', height: 48, borderRadius: 24, marginHorizontal: 'auto' },
            ]}
          >
            <Text style={[T.h3, { color: C.textBtn}]}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </>
    );
}