import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import C from '../../constants/colors';
import Ctn from '../../constants/containers';

export default function RootLayout() {
  return (
    <>
      <React.Fragment>
        <Tabs screenOptions={{
          headerShown: false,
          tabBarInactiveBackgroundColor: C.backgroundPrim,
          tabBarActiveBackgroundColor: C.backgroundSec,
          tabBarActiveTintColor: C.textPrim,
        }}>
          <Tabs.Screen name="home" options={{
            title: "Home",
            headerShown: true,
            header: () => (
              <View style={{backgroundColor: C.backgroundPrim}}>
                <View style={[Ctn.SearchBar]}>
                  <Feather name="search" size={24} color={C.textPrim} />
                  <TextInput
                    style={[{flex: 1, fontSize: 16, color: C.textPrim}]}
                    // value={value}
                    // onChangeText={onChangeText}
                    placeholder='Procurar...'
                    placeholderTextColor={C.textSec}
                  />
                </View>
              </View>
            ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-variant-outline" size={size} color={color} />
            ),
          }} />
          <Tabs.Screen name="cart" options={{
            title: "Carrinho",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cart-outline" size={size} color={color} />
            ),
          }} />
          <Tabs.Screen name="profile" options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
            ),
          }} />
        </Tabs>
      </React.Fragment>
    </>
  )
}