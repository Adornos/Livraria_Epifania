import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewProps } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  onFocus?: (focused: boolean) => void;
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;

  // novas props necessárias
  autoFocus?: boolean;
  editable?: boolean;
  pointerEvents?: ViewProps['pointerEvents'];
};

export default function SearchBar({
  onFocus,
  onChangeText,
  value: externalValue = '',
  placeholder = "Buscar livros...",
  
  autoFocus = false,
  editable = true,
  pointerEvents = 'auto'
}: SearchBarProps) {
  const [query, setQuery] = useState(externalValue);
  const [isFocused, setIsFocused] = useState(false);
  const colors = useThemeColor();

  const onFocusFunc = () => {
    setIsFocused(true);
    if (onFocus) onFocus(true);
  };

  const changeTextFunc = (text: string) => {
    setQuery(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundTert }]}
      pointerEvents={pointerEvents}
    >
      <Ionicons name="search" size={20} color={colors.textSec} />

      <TextInput
        value={query}
        onChangeText={changeTextFunc}
        onFocus={onFocusFunc}
        placeholder={placeholder}
        placeholderTextColor={colors.textSec}
        autoFocus={autoFocus}
        editable={editable}
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
