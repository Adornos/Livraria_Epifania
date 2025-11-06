import { TextInput, KeyboardAvoidingView, View, Text } from "react-native";
import { useThemeColor } from "@hooks/useThemeColor";
import T from "../constants/topography";

type EpifaniaProfileTextInputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: object;
};

const EpifaniaProfileTextInput = ({ placeholder, secureTextEntry = false, keyboardType = 'default', style = {} }: EpifaniaProfileTextInputProps) => {

  const Colors = useThemeColor();

  return (
    <View style={{width: "100%"}}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={[T.p, {color: Colors.textPrim}]}>{placeholder}</Text>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={{
            ...T.p,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            elevation: 4,
            borderBottomWidth: 1,
            borderColor: Colors.textPrim,
            lineHeight: 16,
            ...style,
          }}
          placeholderTextColor={Colors.textSec}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default EpifaniaProfileTextInput;