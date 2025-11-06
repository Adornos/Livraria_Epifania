import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import T from '@constants/topography';

type Props = 
TouchableOpacityProps &
{
  label: string, 
  style?: object
};

export default function Button({label, style = {}, ...props} : Props){
    const C = useThemeColor();
    return(
    <TouchableOpacity {...props} style={{

      backgroundColor: C.primaryButton, 
      width: '100%', 
      height: 50, 
      borderRadius: 8, 
      justifyContent: 'center', 
      alignItems: 'center', 
      ...style

      }}>
        <Text style={[{color: C.textPrim}, T.h3, T.center]}>{label}</Text>
    </TouchableOpacity>
    );
}