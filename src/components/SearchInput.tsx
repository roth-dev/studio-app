import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#EEE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    flex: 1,
  },
});

interface Props extends TextInputProps {}
export default function SearchInput(props: Props) {
  return (
    <ThemedView style={styles.container}>
      <Ionicons name="search" size={16} />
      <TextInput {...props} style={{ flex: 1 }} />
    </ThemedView>
  );
}
