import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback } from "react";

export default function useDrawer() {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);

  const toggleDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, []);

  const closeDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, []);

  return { toggleDrawer, openDrawer, closeDrawer };
}
