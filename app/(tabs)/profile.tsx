import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function ProfilePage() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
        style={styles.profileImage}
      />
      
      <Text style={styles.title}>Meu Perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu sobrenome"
          placeholderTextColor="#aaa"
          value={sobrenome}
          onChangeText={setSobrenome}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
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
