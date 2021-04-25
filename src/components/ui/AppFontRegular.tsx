import React from "react";
import { Text, StyleSheet } from "react-native";

type AppFontPropsType = {
    style?: any
}

export const AppFont: React.FC<AppFontPropsType> = (props) => {
  return <Text style={{...styles.default, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
    default: {
        fontFamily: 'roboto-regular'
    }
})
