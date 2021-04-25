import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { THEME } from "../theme";
import { AppFontBold } from "./ui/AppFontBold";

export const NavBar: React.FC<{}> = (props) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppFontBold
        style={{
          ...styles.text,
          ...Platform.select({
            ios: styles.textIos,
            android: styles.textAndroid,
          }),
        }}
      >
        Todo App
      </AppFontBold>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
    backgroundColor: THEME.WHITE_COLOR,
  },
  text: {
    fontSize: 20,
  },
  textIos: {
    color: THEME.MAIN_COLOR,
  },
  textAndroid: {
    color: THEME.WHITE_COLOR,
  },
});
