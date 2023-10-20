import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import Header from "./src/components/Header";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentState, setCurrentState] = useState("Pomo" | "Short" | "Break");
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentState] }]}
    >
      <View style={{ paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Text style={styles.text}>{time}</Text>
        <Header
          setCurrentState={setCurrentState}
          currentState={currentState}
          setTime={setTime}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontSize: 32, fontWeight: "bold" },
});
