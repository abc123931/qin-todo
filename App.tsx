import { StatusBar } from "expo-status-bar";
import type { VFC } from "react";
import { StyleSheet, Text, View } from "react-native";

const App: VFC = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
