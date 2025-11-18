import { useState, useEffect } from "react";
import { KeyboardAvoidingView, View } from "react-native";
// import { RenderProps } from "react-native-paper/lib/typescript/components/TextInput/types";
// import { MaskedTextInput } from "react-native-mask-text";
import { useThemeColor } from "@hooks/useThemeColor";
import T from "@constants/topography";
import { TextInput } from "react-native-paper";

type EpifaniaProfileTextInputProps = {
  placeholder: string;
  value?: string | null;
  mask?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: object;
};

const EpifaniaProfileTextInput = ({
  placeholder,
  value,
  mask,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style = {}
}: EpifaniaProfileTextInputProps) => {
  
  const Colors = useThemeColor();

  // Sem estado interno aqui!
  
  return (
    <View style={{ width: "100%" }}>
      {/* <KeyboardAvoidingView behavior="padding"> */}
        <TextInput
          mode="flat"
          dense={false}
          label={placeholder}
          value={value ?? ''}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChangeText} // <-- Agora funciona
          activeUnderlineColor="#fff"
          underlineColor="#fff"
          style={{
            ...T.p,
            width: '100%',
            paddingHorizontal: 0,
            paddingTop: 0,
            backgroundColor: 'transparent',
            ...style,
          }}
          placeholderTextColor={Colors.textSec}
          textColor="#fff"
          theme={{
            colors: {
              primary: Colors.textPrim,
              onSurfaceVariant: Colors.textSec
            }
          }}
        />
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default EpifaniaProfileTextInput;