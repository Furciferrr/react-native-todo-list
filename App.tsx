import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";


import { THEME } from "./src/theme";
import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export type TodoItemType = {
  id: string;
  title: string;
};

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);


  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err: any) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }



  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
