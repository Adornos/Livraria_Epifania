import { useColorScheme } from "react-native";
import Colors from "@constants/colors";

export function useThemeColor(){
    const theme = useColorScheme() ?? 'dark';
    return Colors[theme]
}