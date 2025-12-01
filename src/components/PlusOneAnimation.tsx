import { useEffect, useRef, useState } from 'react';
import { Animated, TextStyle } from 'react-native';

interface Props {
  trigger: any;              // muda para disparar animação
  style?: TextStyle;         // posição customizável
  color?: string;            // cor do texto
}

export default function PlusOneAnimation({ trigger, style, color = '#fff' }: Props) {
  const [visible, setVisible] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!trigger) return;

    setVisible(true);

    opacity.setValue(1);
    translateY.setValue(0);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 800,
        useNativeDriver: true
      })
    ]).start(() => {
      setVisible(false);
    });
  }, [trigger]);

  if (!visible) return null;

  return (
    <Animated.Text
      style={[
        {
          position: 'absolute',
          fontSize: 14,
          fontWeight: 'bold',
          color,
          opacity,
          transform: [{ translateY }]
        },
        style
      ]}
    >
      +1
    </Animated.Text>
  );
}
