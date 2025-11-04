import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import React from "react";
import C from "../constants/colors";
// Preciso generalizar os cmponentes para evitar repetição de código

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: C.backgroundPrim },
        }} />
      <StatusBar barStyle="light-content" backgroundColor={C.backgroundPrim} />
    </>
    
  );
}
