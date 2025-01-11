import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Ionicons } from "@expo/vector-icons";
import { Tab, useTab, TabType } from "@/context/TabProvider";
import { MenuView, MenuComponentRef } from "@react-native-menu/menu";
import RelationalDigram from "./digram";
import CreateDatabase from "@/app/create-database";
import QueryEditor from "@/screens/QueryEditor";
// import ExpoSqlModule from "../../../../modules/expo-sql/src/ExpoSqlModule";
export default function EditorTab() {
  const ref = React.useRef<PagerView>(null);
  const [code, setCode] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const { tabs, setTab, removeTab } = useTab();

  function onChange(v: string) {
    setCode(v);
  }
  const connect = async () => {
    try {
      const config = {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "test",
      };
      // try {
      //   const connection = await ExpoSqlModule.connect(
      //     config.host,
      //     config.user,
      //     config.password,
      //     config.database
      //   );
      //   console.log("Connected to database:", connection);

      //   // const results = await query("SELECT * FROM your_table", config);
      //   // console.log("Query results:", results);
      // } catch (error) {
      //   console.error("Database error:", error);
      // }
    } catch (e) {
      console.log(e);
    }
  };
  function onAddNewTab() {
    // menuRef.current?.show();
    // const newTab: Tab = {
    //   name: "unnamed",
    //   component: <View style={{ flex: 1 }} />,
    // };
    // setTab(newTab);
    // setTabs((prev) => [...prev, "Query"]);
  }

  function onChangeTab(index: number) {
    setActiveIndex(index);
    ref.current?.setPageWithoutAnimation(index);
  }

  function onRemoveTab(index: number) {
    removeTab(index);
    // setTabs((prev) => {
    //   return prev.filter((_, idx) => idx !== index);
    // });
  }

  return (
    <>
      <Stack
        screenOptions={{
          title: "Tables",
          headerRight: () => <Text>Hello</Text>,
        }}
      />
      <Button title="Connect Database" onPress={connect} />

      {/* <View style={{ flex: 1 }}>
        <HeaderTab
          onRemoveTab={onRemoveTab}
          activeIndex={activeIndex}
          onAddNewTab={onAddNewTab}
          onChangeTab={onChangeTab}
        />
        <PagerView
          scrollEnabled
          role="navigation"
          ref={ref}
          onPageSelected={(e) => {
            setActiveIndex(e.nativeEvent.position);
          }}
          // onPageScrollStateChanged={(t) => {
          //   setActiveIndex(t)
          // } }
          style={styles.pagerView}
          initialPage={0}
        >
          {tabs.map((tab, index) => {
            return (
              <View key={`tab-view-${index}`} style={{ gap: 5 }}>
                {tab.component}
              </View>
            );
          })}
        </PagerView>
      </View> */}
    </>
  );
}

interface HeaderTabProps {
  activeIndex: number;
  onAddNewTab: () => void;
  onRemoveTab: (index: number) => void;
  onChangeTab: (index: number) => void;
}
function HeaderTab({
  onRemoveTab,
  onAddNewTab,
  onChangeTab,
  activeIndex,
}: HeaderTabProps) {
  const { tabs, setTab } = useTab();

  function handleAddNewTab(type: TabType) {
    let component = <></>;
    if (type === "table") {
      component = <CreateDatabase />;
    } else if (type === "query") {
      component = <QueryEditor />;
    } else if (type === "digram") {
      component = <RelationalDigram />;
    }
    const newTab = {
      name: type,
      component,
    };
    setTab(newTab);
    onChangeTab(tabs.length + 2);
  }

  function renderItems({ item, index }: ListRenderItemInfo<Tab>) {
    const active = activeIndex === index;
    return (
      <Pressable
        onPress={() => onChangeTab(index)}
        style={{
          backgroundColor: active ? "#EEE" : undefined,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          // borderRightWidth: 0.5,
          // borderColor: "#CCC",
          flexDirection: "row",
          gap: 10,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          width: 120,
        }}
      >
        <Text style={{ textTransform: "capitalize" }}>{item.name}</Text>
        <Pressable onPress={() => onRemoveTab(index)}>
          <Ionicons name="close" size={16} />
        </Pressable>
      </Pressable>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        // borderBottomColor: "#CCC",
        // borderBottomWidth: 0.5,
      }}
    >
      <FlatList
        data={tabs}
        horizontal
        renderItem={renderItems}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: "#FFF" }}
        ListFooterComponent={
          <MenuView
            onPressAction={({ nativeEvent }) => {
              handleAddNewTab(nativeEvent.event as TabType);
            }}
            actions={[
              {
                id: "table",
                title: "New Table",
                titleColor: "#2367A2",
                image: Platform.select({
                  ios: "plus",
                  android: "ic_menu_add",
                }),
                imageColor: "#2367A2",
              },
              {
                id: "query",
                title: "New Query",
                titleColor: "#2367A2",
                image: Platform.select({
                  ios: "plus",
                  android: "ic_menu_add",
                }),
                imageColor: "#2367A2",
              },
              {
                id: "digram",
                title: "Relational Digram",
                titleColor: "#2367A2",
                image: Platform.select({
                  ios: "plus",
                  android: "ic_menu_add",
                }),
                imageColor: "#2367A2",
              },
            ]}
            shouldOpenOnLongPress={false}
          >
            <Pressable
              onPress={onAddNewTab}
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons name="add" size={20} />
              <Text>New</Text>
            </Pressable>
          </MenuView>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
