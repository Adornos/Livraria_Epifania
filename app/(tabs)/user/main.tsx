import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.content}>
                <Text style={styles.title}>Bem-vindo à User Main</Text>
                <Text style={styles.subtitle}>Sua livraria favorita no Android.</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
});

export default App;