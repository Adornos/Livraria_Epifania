import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import Ctn from '../../constants/containers'; // Importa Containers do projeto
import T from '../../constants/topography'; // importa Topografia HTML
// import {C} from '../../constants/colors';
import Logo from '../../components/logo'; // Importa o componente de logo


import EpifaniaProfileInput from '../../components/text_profile';

export default function ProfilePage() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <ScrollView style={Ctn.scrollContainer} contentContainerStyle={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
        style={styles.profileImage}
      />
      
      <Text style={styles.title}>Meu Perfil</Text>

      <View style={[styles.inputContainer, {flex: 1, width: "85%", flexWrap: 'wrap', flexDirection: 'column', gap: 16, marginHorizontal: 'auto'}]}>
        <EpifaniaProfileInput label={'Nome'} placeholder={'Nome'} value={nome} onChangeText={setNome} style={{flex: 100}}></EpifaniaProfileInput>
        <EpifaniaProfileInput label={'Sobrenome'} placeholder={'Sobrenome'} value={sobrenome} onChangeText={setSobrenome} style={{flex: 100}}></EpifaniaProfileInput>
        <EpifaniaProfileInput label={"Telefone"} placeholder={"Telefone"} value={telefone} onChangeText={setTelefone} style={{ flex: 100 }} keyboardType="phone-pad"/>
        <EpifaniaProfileInput label={"Email"} placeholder={"Email"} value={email} onChangeText={setEmail} style={{ flex: 100 }} keyboardType="email-address"/> <EpifaniaProfileInput label={"CPF"} placeholder={"CPF"} value={cpf} onChangeText={setCpf} style={{ flex: 1 }}/>
        <EpifaniaProfileInput label={"Senha"} placeholder={"Senha"} value={senha} onChangeText={setSenha} style={{ flex: 100 }} secureTextEntry/>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#980225",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 30,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#980225",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 40,
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
