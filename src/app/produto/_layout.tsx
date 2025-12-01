import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
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
                    headerShown: false,
                    headerTransparent: false,
                    headerStyle: { backgroundColor: 'transparent' },
                    headerTintColor: Colors.textPrim,
                    title: '',
                    headerLeft: () => (
                        <Pressable
                        onPress={() => router.back()}
                        style={{ padding: 12, marginLeft: 4, backgroundColor: Colors.primaryButton, borderRadius: 100 }}
                        >
                        <Ionicons name="arrow-back" size={24} color={Colors.textBtn} />
                        </Pressable>
                    ),
                }}
                
                
            />
        </Stack>
    );
}