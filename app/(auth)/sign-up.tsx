import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import Ctn from '../../constants/containers'; // Importa Containers do projeto
import T from '../../constants/topography'; // importa Topografia HTML
import C from '../../constants/colors';
import Logo from '../../components/logo'; // Importa o componente de logo

import EpifaniaTextInput from '../../components/text_input'; // Importa o componente de input customizado

export default function Auth_SignUp() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <View style={[Ctn.mainContainer]}>     
                    <View style={[{alignItems: 'center', marginVertical: '25%'}]}>
                        <Logo />
                    </View >
                        <View style={[Ctn.mainContainer, { width: '83%' }]}>
                            <EpifaniaTextInput placeholder="Email"/>
                            <EpifaniaTextInput placeholder="Senha" secureTextEntry={true}/>
                            <EpifaniaTextInput placeholder="Telefone" keyboardType="phone-pad" />
                            <EpifaniaTextInput placeholder="Estado" />
                            <EpifaniaTextInput placeholder="Estado" />
                            <Link href="/login" style={{height: 50}}>
                                <TouchableOpacity style={{backgroundColor: C.primaryButton, width: '100%', height: '100%', borderRadius: 12, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[T.h3, T.center, T.button, {color: C.textPrim}]}>Entrar</Text>
                                </TouchableOpacity>
                            </Link>
                            <Link href="/login" style={{marginTop: 20}}>
                                <Text style={[T.caption, T.center, {color: C.textPrim}]}>Já possuo uma conta</Text>
                            </Link>
                        </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};