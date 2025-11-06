import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  onFocus?: (focused: boolean) => void;
  onChangeText?: (text: string) => void;
  value?: string;                        
  placeholder?: string;
};

export default function SearchBar({
  onFocus,
  onChangeText,
  value: externalValue = '',
  placeholder = "Buscar livros..."
}: SearchBarProps) {
  const [query, setQuery] = useState(externalValue); // estado interno do texto
  const [isFocused, setIsFocused] = useState(false); // estado interno do foco
  const colors = useThemeColor();

  const onFocusFunc = (text: boolean) => {
    setIsFocused(text); // Atualiza estado interno
    if (onFocus) onFocus(text); // Chama callback externo se fornecido
  };

  const changeTextFunc = (text: string) => {
    setQuery(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundTert }]}>
      <Ionicons name="search" size={20} color={colors.textSec} />
      <TextInput
        value={query}
        onChangeText={changeTextFunc}
        onFocus={() => onFocusFunc}
        placeholder="Buscar livros..."
        placeholderTextColor={colors.textSec}
        style={[styles.input, { color: colors.textPrim }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 80,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    marginLeft: 8,
  },
});
