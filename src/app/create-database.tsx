import useSqliteDatabase from "@/hooks/useSqliteDatabase";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
    gap: 10,
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    borderColor: "#E2E2E2",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

interface InputProps extends TextInputProps {
  label?: string;
}
function Input(props: InputProps) {
  return (
    <View style={{ gap: 10 }}>
      <Text>{props.label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}
export default function CreateDatabase() {
  const [dbName, setDatabaseName] = useState("unnamed");
  const { createTable, initailizeDatabase } = useSqliteDatabase();

  async function onCreateDatabase() {
    await initailizeDatabase(dbName);
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <Input
          label="Database Name"
          placeholder="Unnamed database"
          value={dbName}
          onChangeText={setDatabaseName}
        />
        <Input label="Table Name" placeholder="Unnamed table" />
        <Text>Columns</Text>
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          <Input label="Column name" placeholder="Unnamed column" />
          <Input label="Column name" placeholder="Unnamed column" />
          <Input label="Column name" placeholder="Unnamed column" />
          <Input label="Column name" placeholder="Unnamed column" />
          <Input label="Column name" placeholder="Unnamed column" />
        </View>

        {/* <Text>Table Name</Text>
        <TextInput style={styles.input} placeholder="Unnamed table" />
        <Text>Columns</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ gap: 10 }}>
            <Text>Column name</Text>
            <TextInput style={styles.input} placeholder="Unnamed table" />
          </View>
          <TextInput style={styles.input} placeholder="Unnamed table" />
        </View> */}
        <Button title="Create Database" onPress={onCreateDatabase} />
      </View>
    </ScrollView>
  );
}
