import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavBar } from "./components/NavBar";
import { ScreenContext } from "./context/screen/screenContext";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { THEME } from "./theme";

export const MainLayout: React.FC<{}> = () => {
  const {todoId}= useContext(ScreenContext);
  
  return (
    <View style={styles.wrapper}>
      <StatusBar style="auto" />
      <NavBar />
      <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1
  },
  wrapper: {
    flex: 1
  }
});
