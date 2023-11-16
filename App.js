import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import Counter from "./src/components/Counter";

const colors = ["#9370db", "#87ceeb", "#dda0dd"];

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [currentState, setCurrentState] = useState(0 | 1 | 2);
  const [clock, setClock] = useState(false);
  const [short, setShort] = useState(true);
  const [work, setWork] = useState(0);

  useEffect(() => {
    let interval = null;

    if (clock) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (currentState === 3) {
      setCurrentState(0);
    }
    if (time === 0 && currentState === 0 && short === true) {
      setCurrentState(1);
      setTime(300);
      setShort(false);
      playWorkSound();
      setWork(work + 1);
    }
    if (time === 0 && currentState === 0 && short === false) {
      setCurrentState(2);
      setTime(900);
      setShort(true);
      playWorkSound();
      setWork(work + 1);
    }
    if (time === 0 && currentState === 1) {
      setCurrentState(0);
      setTime(1500);
    }
    if (time === 0 && currentState === 2) {
      setCurrentState(0);
      setTime(1500);
      setShort(true);
    }

    return () => clearInterval(interval);
  }, [clock, time, currentState]);

  function handleStartStop() {
    clock ? playStopSound() : playStartSound();
    setClock(!clock);
  }

  async function playStartSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/start.mp3")
    );
    await sound.playAsync();
  }

  async function playStopSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/stop.mp3")
    );
    await sound.playAsync();
  }

  async function playWorkSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/workFinish.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentState] }]}
    >
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" && 30,
          paddingHorizontal: 15,
          overflow: "hidden",
        }}
      >
        <StatusBar style="inverted" />
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          setCurrentState={setCurrentState}
          currentState={currentState}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {clock ? "STOP" : "START POMODORO"}
          </Text>
        </TouchableOpacity>
        <Counter work={work} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontSize: 32, fontWeight: "bold", color: "white" },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    margin: 40,
    borderRadius: 15,
  },
});
