import { ScrollView, Image, Text, View, Pressable, ImageBackground, Animated } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import TextStyles from '@constants/topography';
import Button from '@components/Button';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PlusOneAnimation from '@components/PlusOneAnimation';

import { addItemToCart, getCartItemsQuantity } from '@api/localDataActions';


type tiposTemplate = {
  tipo: string,
  price: string,
  estoque: string
}

type bookTemplate = {
  id_livro: string,
  titulo: string,
  image: string,
  sinopse: string,
  autor: string,
  editora: string,
  tipos: tiposTemplate[]
}



export default function Produto() {

  const router = useRouter();
  const { book } = useLocalSearchParams<{ book: string }>();
  const bookData = JSON.parse(book);
  const colors = useThemeColor();
  const [tipoRadio, setTipoRadio] = useState('0');
  const [preco, setPreco] = useState('');
  const [numero_itensCarrinho, setNumero_itensCarrinho] = useState(0)
  const [plusOneTrigger, setPlusOneTrigger] = useState(0);



  useEffect(() => {
    const load = async () => {
      const quantidade = await getCartItemsQuantity();
      setNumero_itensCarrinho(quantidade);
    };

    load();
  }, []);


  useEffect(() => setPreco(
    Number(bookData.tipos[tipoRadio].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  ), [tipoRadio])

  const addToCart = async () => {
    const tipoSelecionado = bookData.tipos[tipoRadio];

    const item = {
      id_livro: bookData.id_livro,
      titulo: bookData.titulo,
      image: bookData.image,
      tipo: tipoSelecionado.tipo,
      price: Number(tipoSelecionado.price),
      quantidade: 1,          // quantidade que o usuário está comprando
      estoque: Number(tipoSelecionado.estoque)  // estoque disponível
    };

    const success = await addItemToCart(item);

    if (success) {
      const quantidade = await getCartItemsQuantity();
      setNumero_itensCarrinho(quantidade);
      
      setPlusOneTrigger(Date.now())
    }
  };

  const construct_TipoRadioButton = (tiposArray : tiposTemplate[]) => {    
    return (
          tiposArray.map((tipos, i) => (
            <Pressable key={i} onPress={() => setTipoRadio(i.toString()) } style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems: 'center', backgroundColor: colors.backgroundSec, borderRadius: 50, borderWidth: 1, borderColor: colors.backgroundTert}}>
              <RadioButton.Item
                value={i.toString()}
                label={tipos.tipo}
                status={tipoRadio === i.toString() ? 'checked' : 'unchecked'}
                onPress={() => setTipoRadio(i.toString()) }
                position='leading'
                labelStyle={{ color: colors.textPrim, fontWeight: 800 }}
                style={{ padding: 0, zIndex: -2 }}
              />
              <Text style={[{color: colors.textPrim, fontWeight:800, marginEnd: '7%'}]}>
                {Number(tipos.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - {Number(tipos.estoque)}
              </Text>
            </Pressable>
          ))
    )
  }

  return (
    <>
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
    <ImageBackground blurRadius={3} source={{ uri: bookData.image }} resizeMode="cover" style={{flex: 1,justifyContent: 'center'}}>
      <Pressable
        onPress={() => router.back()}
        style={{ zIndex:100, position: 'absolute', width: 48, padding: 12, left: 20, top: 40, backgroundColor: colors.primaryButton, borderRadius: 100 }}
        >
        <Ionicons name="arrow-back" size={24} color={colors.textBtn} />
      </Pressable>
      <Pressable
        onPress={() => router.push('/cart')}
        style={{ zIndex:100, position: 'absolute', width: 48, padding: 12, right: 20, top: 40, backgroundColor: colors.primaryButton, borderRadius: 100 }}
        >
              <Ionicons name="cart" size={24} color={colors.textBtn} />
              {
                numero_itensCarrinho > 0 &&
                <Text style={{ right: -1, bottom: -1, position: 'absolute', color: colors.textBtn, backgroundColor: colors.backgroundBook, borderRadius: 100, width: 16, height: 16, textAlign: 'center', fontSize: 11 }}>
                  {numero_itensCarrinho ? numero_itensCarrinho.toString() : ''}
                </Text>
              }
              <PlusOneAnimation
                trigger={plusOneTrigger} style={{right: -10, bottom: 20}} color={colors.textBtn}
              />
      </Pressable>
      <ScrollView style={{ flex: 1, backgroundColor: '#00000063'}}>
        <View>
          <Image
            source={{ uri: bookData.image }}
            style={{ zIndex: 100, width: 200, height: 300, alignSelf: 'center', marginVertical: 20, top: 100}}
          />
          <View style={{ zIndex: 10, paddingTop: 100, paddingHorizontal: 20, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: colors.backgroundPrim }}>
            <Text style={[TextStyles.h1, { color: colors.textPrim }]}>{bookData.titulo}</Text>

            <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                <Text style={[TextStyles.p, { color: colors.textSec }]}>Autor: {bookData.autor}</Text>
                <Text style={[TextStyles.p, { color: colors.textSec }]}>Editora: {bookData.editora}</Text>
              </View>
              <Text style={[TextStyles.h2, { color: colors.textPrim}]}>
                {preco}
              </Text>
            </View>

            <View style={{flex:1, marginVertical: 10, gap:10}}>
              {construct_TipoRadioButton(bookData.tipos)}
            </View>

            <View style={{backgroundColor: colors.backgroundSec, padding: 15, borderRadius:15 }}>
              <Text style={[TextStyles.h2, { color: colors.textPrim}]}>Sinopse:</Text>
              <Text style={[TextStyles.p, { color: colors.textPrim, textAlign: "justify"}]}>{bookData.sinopse}</Text>
            </View>

            <Button style={{ borderRadius: 100, marginVertical: 20 }} label={`Adicionar ao carrinho — ${preco}`} onPress={() => {addToCart()}} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
    </SafeAreaView>
    </SafeAreaProvider>
    </>
  );
}