import React from "react";
import {
  DrawerContent as BaseDwrawerContent,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert, SafeAreaView, TextInput, View } from "react-native";
import SearchInput from "../SearchInput";
import { BlurView } from "expo-blur";
import useDrawer from "@/hooks/useDrawer";

const HEADER_HEIGHT = 100;

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { closeDrawer } = useDrawer();
  return (
    <View style={{ flex: 1 }}>
      <BlurView
        intensity={50}
        style={{
          position: "absolute",
          width: "100%",
          height: HEADER_HEIGHT,
          justifyContent: "flex-end",
          paddingBottom: 10,
          zIndex: 100,
          paddingHorizontal: 10,
        }}
      >
        <SearchInput placeholder="Search tables..." />
      </BlurView>

      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        {/* <BaseDwrawerContent {...props}> */}

        {Array.from({ length: 100 }).map((_, index) => {
          return (
            <DrawerItem
              key={index}
              label={`Drawer item - ${index + 1}`}
              onPress={() => {
                closeDrawer();
              }}
              {...props}
            />
          );
        })}
        {/* </BaseDwrawerContent> */}
      </DrawerContentScrollView>
    </View>
  );
}
