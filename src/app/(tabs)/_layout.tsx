import { Tabs } from "expo-router";
import { useThemeColor } from "@hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

export default function TabLayout(){


    const Colors = useThemeColor();

    return(
        <Tabs

        screenOptions={{
            headerShown: false,
            tabBarStyle:{
                backgroundColor: Colors.backgroundPrim,
                borderColor: Colors.backgroundTert,
                borderTopWidth: 1,
            },
            tabBarActiveTintColor: Colors.textPrim,
            tabBarHideOnKeyboard: true,
            sceneStyle:{
                backgroundColor: Colors.backgroundPrim
                },
        }}
        >
            <Tabs.Screen 
                name="home" 
                options={{tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                    />
                )}}
            />
            <Tabs.Screen 
                name="profile" 
                options={{tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                    name={focused ? "person" : "person-outline"}
                    size={size}
                    color={color}
                    />
                ),}}
            />
            <Tabs.Screen 
                name="cart" 
                options={{tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons
                    name={focused ? "cart" : "cart-outline"}
                    size={size}
                    color={color}
                    />
                )}}
            />
        </Tabs>
    );
}