import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import Ctn from '../constants/containers'; // Importa Containers do projeto
import T from '../constants/topography'; // importa Topografia HTML
import C from '../constants/colors'; // Importa Cores do projeto
import EntryLogo from '../components/entry_logo'; // Importa o componente de logo

export default function App_EntryIndex(){
    return (
        <SafeAreaView style={[Ctn.mainContainer, { justifyContent: 'flex-end' }]}>
            <StatusBar barStyle="light-content" backgroundColor={C.mutedText} />
            <View style={{ position: 'absolute', top: '30%', alignItems: 'center' }}>
                <EntryLogo />
            </View>
            <View style={{ marginBottom: '30%' }}>
                <Link href="/login"><Text style={[T.h2, T.center, {color: C.textPrimary, lineHeight: 48}]}>Entrar</Text></Link>
                <Link href="/sign-up"><Text style={[T.caption, T.center, {color: C.textSecondary}]}>Criar Conta</Text></Link>
            </View>
        </SafeAreaView>
    );
};