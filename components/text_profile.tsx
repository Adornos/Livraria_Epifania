import { Text, TextInput, KeyboardAvoidingView } from "react-native";
import C from "../constants/colors";
import T from "../constants/topography";
import Ctn from "../constants/containers";

type EpifaniaProfileInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: object;
};

const EpifaniaProfileInput = ({ label, value, placeholder, onChangeText, secureTextEntry = false, keyboardType = 'default', style = {} }: EpifaniaProfileInputProps) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={[{flex: 1, width: "100%", alignItems: 'flex-start'}]}>
      <Text style={[T.h3, {color: C.textPrim, fontWeight: 400}]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={{
          ...T.h3,
          marginTop: 8,
          lineHeight: 16,
          includeFontPadding: false,
          textAlignVertical: "bottom",
          paddingTop: 0,
          paddingBottom: 2,
          width: '100%',
          borderBottomWidth: 1,
          borderColor: C.textPrim,
          ...style,
        }}
        placeholderTextColor={C.textSec}
        value={value}
        
      />
    </KeyboardAvoidingView>
  );
};

export default EpifaniaProfileInput;