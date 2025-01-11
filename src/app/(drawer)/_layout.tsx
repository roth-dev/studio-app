import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Drawer } from "expo-router/drawer";
import DrawerContent from "@/components/drawer/DrawerContent";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function MainAppDrawer() {
  return (
    <Drawer
      // defaultStatus="open"
      detachInactiveScreens
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "red",
        drawerInactiveBackgroundColor: "red",
        drawerStyle: {
          width: "70%",
        },
        overlayColor: "transparent",
        // drawerType: "permanent",
        // headerShown: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Tables",
          // headerLeft: () => (
          //   <Ionicons
          //     name="menu"
          //     size={18}
          //     color="#222"
          //     style={{
          //       padding: 5,
          //       alignSelf: "center",
          //       textAlign: "center",
          //     }}
          //   />
          // ),
        }}
      />
    </Drawer>
  );
}
