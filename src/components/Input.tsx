import { useState } from "react";
import { TextInput, KeyboardAvoidingView, View } from "react-native";
import { useThemeColor } from "@hooks/useThemeColor";
import T from "@constants/topography";

type EpifaniaTextInputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: object;
  onChangeText?: (text: string) => void;
  value?: string;
};

const EpifaniaTextInput = ({
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  style = {},
  onChangeText,
  value: externalValue
}: EpifaniaTextInputProps) => {

  const C = useThemeColor();
  const [value, setValue] = useState(externalValue || ""); // Estado interno

  const changeText = (text: string) => {
    setValue(text); // Atualiza estado interno
    if (onChangeText) onChangeText(text); // Chama callback externo se fornecido
  };

  return (
    <View style={{width: "100%"}}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={changeText}
          style={{
            ...T.p,
            color: C.textPrim,
            backgroundColor: C.backgroundSec,
            height: 50,
            borderRadius: 8,
            paddingHorizontal: 12,
            // marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            elevation: 4,
            ...style,
          }}
          placeholderTextColor={C.textSec}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default EpifaniaTextInput;