import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@hooks/useThemeColor';
export default function StackLayout(){

    const Colors = useThemeColor();
    const router = useRouter();

    return(
        <Stack>
            <Stack.Screen
                name="[produto]"
                options={{
                title: 'Detalhes do Produto',
                headerLeft: () => (
                    <Pressable
                    onPress={() => router.back()}
                    style={{ padding: 6, marginLeft: 4 }}
                    >
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrim} />
                    </Pressable>
                ),
                }}
            />
        </Stack>
    );
}