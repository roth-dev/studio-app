import SqlEditor from "@/components/editor/SqlEditor";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function QueryEditor() {
  const [statment, setStatment] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#FFF",
          right: 0,
          zIndex: 10,
          position: "absolute",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            gap: 10,
            alignSelf: "flex-end",
          }}
        >
          <Ionicons name="play-outline" size={16} />
          <Text>Run</Text>
        </TouchableOpacity>
      </View>
      <SqlEditor value={statment} onChangeText={setStatment} />
    </View>
  );
}
