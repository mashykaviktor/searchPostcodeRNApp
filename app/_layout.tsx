import { Stack } from "expo-router/stack";
import { SharedStateProvider } from "./providers/SharedStateProvider";

export default function Layout() {
  return (
    <SharedStateProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SharedStateProvider>
  );
}
