import { StyleSheet, Image, Platform, SafeAreaView, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ResizableLayout from "@/components/layout/DraggableResizable";
import EditorTab from ".";
import SqlEditor from "@/components/editor/SqlEditor";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ResizableLayout>
        <ResizableLayout.SideBar contentContainerStyle={{ flexGrow: 1 }}>
          <ThemedText>This Side bar</ThemedText>
          <ThemedText>This Side bar</ThemedText>
          <ThemedText>This Side bar</ThemedText>
          <ThemedText>This Side bar</ThemedText>
          <ThemedText>This Side bar</ThemedText>
        </ResizableLayout.SideBar>
        <ResizableLayout.Content style={{ flex: 1 }}>
          <SqlEditor value="" onChangeText={() => {}} />
        </ResizableLayout.Content>
        <ResizableLayout.Footer>
          <ThemedText>This is footer</ThemedText>
        </ResizableLayout.Footer>
      </ResizableLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
