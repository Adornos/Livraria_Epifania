import { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TextStyles from '@constants/topography';
import Button from '@components/Button';

import { getCartItems, flushCartItems, removeCartItem, updateCartItems, getUserData } from '@api/localDataActions';
import { operateCart } from '@api/cartActions';

import CartItem, {CartItemTemplate} from '@components/CartItem';
import { router } from 'expo-router';

export default function Cart() {

  const colors = useThemeColor();
  const [items, setItems] = useState<CartItemTemplate[]>([]);

  async function loadCart() {
    const data = await getCartItems();
    if (data) setItems(data);
  }

  useEffect(() => { // Carregamento Inicial
    loadCart();
  }, []);

  useEffect(() => { // Carregamento após alterações
    const timeout = setTimeout(() => {
      updateCartItems(items)
    }, 300);
    return () => clearTimeout(timeout)
  }, [items])

  async function handleCartOperation() {

    const userData = await getUserData();
    
    // console.log(userData)

    if (userData.cpf == null) {
      Alert.alert("Erro", "Preencha o CPF antes de finalizar a compra!");
      return;
    }

    const result = await operateCart();
    if (result.success) {
      await flushCartItems();
      loadCart();
      router.navigate('/home')
      Alert.alert("Compra Realizada!")
    }
  }

function handleRemove(index: number) {
  removeCartItem(index)
  setItems(prev => prev.filter((_, i) => i !== index));
}

function handleIncrease(index: number) {
  setItems(prev =>
    prev.map((item, i) =>
      i === index && item.quantidade < item.estoque
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    )
  );
}

function handleDecrease(index: number) {
  setItems(prev =>
    prev.map((item, i) =>
      i === index && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    )
  );
}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: colors.backgroundPrim, padding: 16 }}>
          
          <Text style={[TextStyles.h1, { color: colors.textPrim }]}>Carrinho</Text>

          {/* Mensagem de carrinho vazio */}
          {items.length === 0 && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: colors.textSec }}>Nenhum item no carrinho</Text>
            </View>
          )}

          {/* Lista de itens */}
          {<FlatList<CartItemTemplate>
            scrollEnabled
            data={items}
            keyExtractor={(_, index) => String(index)}   // usar o index como chave
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: 20
            }}
            renderItem={({ item, index }) => (
              <CartItem
                id={item.id}
                titulo={item.titulo}
                price={item.price}
                quantidade={item.quantidade}
                tipo={item.tipo}
                image={item.image}
                estoque={item.estoque}

                // agora passando o index REAL
                onRemove={() => handleRemove(index)}
                onAdd={() => handleIncrease(index)}
                onRemoveQty={() => handleDecrease(index)}
              />
            )}
          />
          }

          <Button label="Comprar" onPress={() => {handleCartOperation()}} />
          {/* <Text style={{color: colors.textPrim}}>{ JSON.stringify(items)}</Text> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}