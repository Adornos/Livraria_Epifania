import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import Ctn from '../../constants/containers'; // Importa Containers do projeto
import T from '../../constants/topography'; // importa Topografia HTML
import C from '../../constants/colors';
import Logo from '../../components/logo'; // Importa o componente de logo

const DATA = [
  { id: "1", name: "Duna", author: "Frank Herbert" },
  { id: "2", name: "Neuromancer", author: "William Gibson" },
  { id: "3", name: "Fundação", author: "Isaac Asimov" },
  { id: "4", name: "Orgulho e Preconceito", author: "Jane Austen" },
  { id: "5", name: "O Morro dos Ventos Uivantes", author: "Emily Brontë" },
  { id: "6", name: "O Senhor dos Anéis", author: "J.R.R. Tolkien" },
  { id: "7", name: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling" },
  { id: "8", name: "Sapiens", author: "Yuval Noah Harari" },
  { id: "9", name: "Educated", author: "Tara Westover" },
];

export default function Tabs_Home() {
    return (
        <SafeAreaView style={[{ flex: 1 }, Ctn.homeContainer]}> {/* adicionar SectionList */}
            <View style={{ width: "90%" }}>
                <Text style={T.h2}>Livros: (Preview)</Text>
            </View>
            <View style={{ width: "100%" }}>
                <FlatList
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{width: 16}}/>}
                        style={Ctn.bookHorizontalContainer}
                        data={DATA}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={Ctn.bookCard}>
                                <Image
                                    source={require('../../components/imgs/books/book.jpg')}
                                    style={Ctn.bookImage}
                                />
                                {/* 
                                <Text style={[T.h3, {alignSelf: 'flex-start'}]}>{item.name}</Text>
                                <Text style={[T.p, {color: C.textSec, alignSelf: 'flex-end'}]}>{item.author}</Text> 
                                */}
                            </View>
                        )}
                        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                        showsVerticalScrollIndicator={false}
                    />
            </View>
        </SafeAreaView>
    );
};

