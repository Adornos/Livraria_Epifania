import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

import Ctn from '../../constants/containers'; // Importa Containers do projeto
import T from '../../constants/topography'; // importa Topografia HTML
import C from '../../constants/colors'; // Importa Cores do projeto
import Logo from '../../components/logo'; // Importa o componente de logo

import EpifaniaTextInput from '../../components/text_input';

export default function Auth_Login(){

    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={[Ctn.mainContainer]}>
                        <View style={[{alignItems: 'center', marginVertical: '50%'}]}>
                            <Logo />
                        </View>
                        <View style={[Ctn.mainContainer, { width: '83%' }]}>
                            <EpifaniaTextInput placeholder="Email"/>
                            <EpifaniaTextInput placeholder="Senha" secureTextEntry={true}/>
                                <TouchableOpacity onPress={() => router.push("/home")} style={{backgroundColor: C.primaryButton, width: '100%', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[T.h3, T.center, T.button, {color: C.textPrimary}]}>Entrar</Text>
                                </TouchableOpacity>
                            <Link href="/sign-up" style={{marginTop: 20}}>
                                <Text style={[T.caption, T.center, {color: C.textPrimary}]}>Esqueci minha senha</Text>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    );
};