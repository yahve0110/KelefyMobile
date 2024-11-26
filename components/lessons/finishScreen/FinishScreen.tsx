import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

export default function FinishScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.congratulationsText}>Congratulations!</Text>
        <Text style={styles.subText}>You completed the task!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Link style={styles.button} href="/levels/1">
          <Text style={styles.buttonText}>Go to Home</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  textContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,

    color: "white",
  },
  button:{
    backgroundColor: Colors.light.green,
    padding: 10,
    borderRadius: 5,
  }
});
