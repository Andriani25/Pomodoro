import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

const options = ["Pomodoro", "Short Break", "Long Break"];

const colors = ["#C0392B", "#F4D03F", "#2ECC71"];

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [currentState, setCurrentState] = useState(0 | 1 | 2);
  const [clock, setClock] = useState(false);
  // estado long para saber si el break es long o short, para iterar entre ambos
  const [long, setLong] = useState(false);
  // estado para marcar cuantos tiempos de trabajo se harán
  const [working, setWorking] = useState(0);

  useEffect(() => {
    let interval = null;

    if (clock) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      clearInterval(interval);
    }

    if (time === 0 && currentState === 0) {
      setCurrentState(1);
      setTime(300);
      if (time === 0 && currentState === 1) {
        setCurrentState(0);
        setTime(1500);
      }
      if (time === 0 && currentState === 2) {
        setCurrentState(0);
        setTime(1500);
      } else {
        setTime(900);
      }
    }

    return () => clearInterval(interval);
  }, [clock, time]);

  /*

  Respaldo del useEffect

   useEffect(() => {
    let interval = null;

    if (clock) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setClock(false);
      if (currentState === 0) {
        setTime(1500);
      }
      if (currentState === 1) {
        setTime(300);
      } else {
        setTime(900);
      }
    }

    return () => clearInterval(interval);
  }, [clock, time]);

  */

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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentState] }]}
    >
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" && 30,
          paddingHorizontal: 15,
        }}
      >
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontSize: 32, fontWeight: "bold" },
  button: {
    alignItems: "center",
    backgroundColor: "#696969",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
