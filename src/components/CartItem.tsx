import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import TextStyles from '@constants/topography';
import { useState } from 'react';

export type CartItemTemplate = {
  id: number | string;
  titulo: string;
  price?: number | undefined;
  tipo: string;
  quantidade: number;
  estoque: number;
  image?: string;

  onRemove: () => void;
  onAdd: () => void;
  onRemoveQty: () => void;
};

export default function CartItem({
  id,
  titulo,
  price,
  tipo,
    quantidade,
  image,
  onRemove,
  onAdd,
  onRemoveQty
}: CartItemTemplate) {

    const C = useThemeColor();

  return (
    <View style={[styles(C).CartItemContainer]}>
      
      <View style={styles(C).CartImageContainer}>
        <Image 
          source={{ uri: image || "https://via.placeholder.com/150" }}
          style={styles(C).CartImage}
        />
      </View>

      <View style={styles(C).CartDetailsContainer}>
        
        <View style={styles(C).RowTitleClose}>
          <Text numberOfLines={2} style={[TextStyles.p, { color: C.backgroundPrim, flex:1 }]}>{titulo}</Text>

          <TouchableOpacity hitSlop={8} onPress={onRemove}>
            <Text style={{ color: C.backgroundPrim, fontSize: 18, paddingHorizontal: 4 }}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={[TextStyles.h3, { color: C.backgroundPrim }]}>
          R$ {price && price.toFixed(2)}
        </Text>

        <Text style={[TextStyles.p, { color: C.backgroundPrim, opacity: 0.8}]}>
          {tipo}
        </Text>

        <View style={styles(C).ItemQuantityContainer}>
          <TouchableOpacity hitSlop={8} style={styles(C).TouchableMinus} onPress={onRemoveQty}>
            <Text style={styles(C).TextMinus}>–</Text>
          </TouchableOpacity>

          <Text style={styles(C).TextQuantity}>{quantidade}</Text>

          <TouchableOpacity hitSlop={8} style={styles(C).TouchablePlus} onPress={onAdd}>
            <Text style={styles(C).TextPlus}>+</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}

const styles = (C : any) =>
  StyleSheet.create({
    CartItemContainer: {
        minHeight: 100,
        height: 180,
      width: '90%',
      backgroundColor: C.textPrim,
      borderRadius: 20,
      flexDirection: 'row',
      padding: 10,
      marginVertical: 10,
    },

    CartImageContainer: {
      height: '100%',
      width: '40%',
      backgroundColor: C.textSec,
      borderRadius: 16,
      overflow: 'hidden',
    },

    CartImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    CartDetailsContainer: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'space-between',
    },

    RowTitleClose: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },

    ItemQuantityContainer: {
      height: '22%',
      minHeight: 35,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: C.muted,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
    },

    TouchableMinus: {
      paddingHorizontal: 6,
    },
    TouchablePlus: {
      paddingHorizontal: 6,
    },

    TextMinus: {
      fontSize: 18,
      color: C.muted,
    },
    TextPlus: {
      fontSize: 18,
      color: C.muted,
    },
    TextQuantity: {
      fontSize: 18,
      color: C.backgroundPrim,
    },
  });
