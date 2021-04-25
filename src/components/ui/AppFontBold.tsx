import React from "react";
import { Text, StyleSheet } from "react-native";

type AppFontBoldPropsType = {
    style?: any
}

export const AppFontBold: React.FC<AppFontBoldPropsType> = (props) => {
  return <Text style={{...styles.default, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
    default: {
        fontFamily: 'roboto-bold'
    }
})
