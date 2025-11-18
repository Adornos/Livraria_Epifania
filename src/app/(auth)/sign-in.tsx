import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import Logo from '@components/Logo';
import { useThemeColor } from '@hooks/useThemeColor';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import T from '@constants/topography';
// import Collapsible from 'react-native-collapsible/';
// import Accordion from 'react-native-collapsible/Accordion';
import { useState } from 'react';
import { set_usuario } from '@api/userActions';

type Usuario = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  telefone: string | null;
  cpf: string | null;
  estado: string | null;
  cidade: string | null;
  bairro: string | null;
  rua: string | null;
  numero_casa: string | null;
  complemento?: string | null;
};

export default function Sign() {
  const colors = useThemeColor();

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCPF] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')

  const criarObjetoUsuario = (): Usuario => {
    return {
      nome,
      sobrenome,
      email,
      senha,
      telefone: telefone || null, // torna opcional,
      cpf: cpf || null, // torna opcional,
      estado: estado || null, // torna opcional,
      cidade: cidade || null, // torna opcional,
      bairro: bairro || null, // torna opcional,
      rua: rua || null, // torna opcional,
      numero_casa: numero || null, // torna opcional, 
      complemento: complemento || null, // torna opcional
    };
  }

  const validarFormulario = async () => {

    if (!nome || !email || !senha) {
      alert("Preencha os campos obrigatórios!");
      return null;
    } 

    const result = await set_usuario(criarObjetoUsuario());
      if (result.success) {
        alert('Usuário criado com sucesso!');
        router.push('/login'); // redireciona para login, se quiser
      } else {
        alert('Erro ao criar usuário: ' + (result.error || 'Desconhecido'));
      }
 
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrim }}>
        <ScrollView style={{ backgroundColor: colors.backgroundPrim}}>
          <View style={{ width: '86%', flex:1, flexDirection: 'column', marginHorizontal: 'auto', gap: 16}}>
            
            <Logo style={{marginVertical: 64}}/>

            <Input value={nome} onChangeText={setNome} placeholder="Nome" />
            <Input value={sobrenome} onChangeText={setSobrenome} placeholder="Sobrenome" />
            <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            <Input value={senha} onChangeText={setSenha} placeholder="Senha" secureTextEntry />
            <Input value={telefone} onChangeText={setTelefone} placeholder="Telefone" keyboardType="phone-pad" />

            <Input value={cpf} onChangeText={setCPF} placeholder="CPF" />
            <Input value={estado} onChangeText={setEstado} placeholder="Estado" />
            <Input value={cidade} onChangeText={setCidade} placeholder="Cidade" />
            <Input value={bairro} onChangeText={setBairro} placeholder="Bairro" />
            <Input value={rua} onChangeText={setRua} placeholder="Rua" />
            <Input value={numero} onChangeText={setNumero} placeholder="Número" />
            <Input value={complemento} onChangeText={setComplemento} placeholder="Complemento" />

            <Button style={{marginBottom: 64}}label="Criar Conta" onPress={() => {validarFormulario()}} />

          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
