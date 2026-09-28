import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  useEffect(() => {
    loadName();
  }, []);

  const loadName = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");

      if (storedName !== null) {
        setSavedName(storedName);
      }
    } catch (error) {
      console.log("Error loading name:", error);
    }
  };

  const saveName = async () => {
    if (name.trim() === "") {
      return;
    }

    try {
      await AsyncStorage.setItem("userName", name);
      setSavedName(name);
      setName("");
    } catch (error) {
      console.log("Error saving name:", error);
    }
  };

  const clearName = async () => {
    try {
      await AsyncStorage.removeItem("userName");
      setSavedName("");
    } catch (error) {
      console.log("Error clearing name:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Storage Demo</Text>

      <Text style={styles.label}>Enter your name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={saveName}>
        <Text style={styles.buttonText}>Save Name</Text>
      </TouchableOpacity>

      <Text style={styles.savedLabel}>Saved Name:</Text>

      <Text style={styles.savedName}>{savedName || "No name saved"}</Text>

      <TouchableOpacity style={styles.clearButton} onPress={clearName}>
        <Text style={styles.buttonText}>Clear Name</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  clearButton: {
    backgroundColor: "#555",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  savedLabel: {
    fontSize: 18,
    marginTop: 35,
  },

  savedName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
});
