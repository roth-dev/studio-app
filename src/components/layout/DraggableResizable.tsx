import React, { Children, PropsWithChildren } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ScrollViewProps,
  ViewProps,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DraggableResizeProps } from "./@type";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MIN_SIDEBAR_WIDTH = 100;
const MAX_SIDEBAR_WIDTH = screenWidth / 2;
const MIN_BOTTOMBAR_HEIGHT = 50;
const MAX_BOTTOMBAR_HEIGHT = screenHeight / 2;

function ResizableLayout({
  children,
  ...props
}: PropsWithChildren<DraggableResizeProps>) {
  // Shared values for sidebar width and bottom bar height
  const sidebarWidth = useSharedValue(screenWidth / 4);
  const bottomBarHeight = useSharedValue(100);

  // Gesture for resizing the sidebar
  const resizeSidebarGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newWidth = sidebarWidth.value + event.translationX;
      sidebarWidth.value = Math.min(
        Math.max(newWidth, MIN_SIDEBAR_WIDTH),
        MAX_SIDEBAR_WIDTH
      );
    })
    .onEnd(() => {
      sidebarWidth.value = withSpring(sidebarWidth.value);
    });

  // Gesture for resizing the bottom bar
  const resizeBottomBarGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newHeight = bottomBarHeight.value - event.translationY;
      bottomBarHeight.value = Math.min(
        Math.max(newHeight, MIN_BOTTOMBAR_HEIGHT),
        MAX_BOTTOMBAR_HEIGHT
      );
    })
    .onEnd(() => {
      bottomBarHeight.value = withSpring(bottomBarHeight.value);
    });

  // Styles for sidebar
  const sidebarStyle = useAnimatedStyle(() => ({
    width: sidebarWidth.value,
  }));

  // Styles for bottom bar
  const bottomBarStyle = useAnimatedStyle(() => ({
    height: bottomBarHeight.value,
  }));

  // Styles for main content area
  const mainContentStyle = useAnimatedStyle(() => ({
    width: screenWidth - sidebarWidth.value,
    height: screenHeight - bottomBarHeight.value,
  }));

  function getChildren(childType: any) {
    return React.Children.map(children, (child) =>
      React.isValidElement(child) && child.type === childType
        ? React.cloneElement(child, {})
        : null
    );
  }
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      {!props.disbaleSideBar && (
        <Animated.View style={[styles.sidebar]}>
          <GestureDetector gesture={resizeSidebarGesture}>
            <View style={{ flex: 1 }}>
              {getChildren(ResizableLayout.SideBar)}
            </View>
          </GestureDetector>
        </Animated.View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Animated.View style={styles.content}>
          {getChildren(ResizableLayout.Content)}
        </Animated.View>
        {/* Bottom Bar */}
        <Animated.View style={[styles.bottomBar, bottomBarStyle]}>
          <GestureDetector gesture={resizeBottomBarGesture}>
            <View style={{ flex: 1 }}>
              {getChildren(ResizableLayout.Footer)}
            </View>
          </GestureDetector>
        </Animated.View>
      </View>
    </View>
  );
}

ResizableLayout.SideBar = (props: PropsWithChildren<ScrollViewProps>) => {
  return <ScrollView {...props} />;
};

ResizableLayout.Content = (props: PropsWithChildren<ViewProps>) => {
  return <View {...props} />;
};
ResizableLayout.Footer = (props: PropsWithChildren<ScrollViewProps>) => {
  return <ScrollView horizontal {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    backgroundColor: "#eee",
    height: "100%",
    width: "25%",
  },
  mainContent: {
    height: "100%",
    width: "75%",
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    backgroundColor: "#ccc",
    flex: 0.2,
  },
  resizeHandleVertical: {
    backgroundColor: "#95a5a6",
  },
  resizeHandleHorizontal: {
    backgroundColor: "#95a5a6",
  },
});

export default ResizableLayout;
