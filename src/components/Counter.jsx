import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Platform } from "react-native";

export default function Counter({ work }) {
  return (
    <SafeAreaView style={{ flex: 1, paddig: 15 }}>
      <View style={styles.container}>
        <Text style={styles.text}>Work Streak!</Text>
        <Text style={[styles.text, { color: "black" }]}>🎉 {work} 🥳</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: Platform.OS === "android" && 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  text: { fontSize: 25, fontWeight: "bold", color: "black" },
});
