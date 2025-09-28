import { Stack } from "expo-router";
import React from "react";

// Preciso generalizar os cmponentes para evitar repetição de código

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#121212" },
      }}
    />
  );
}
