import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { THEME } from "../../theme";
import { AppFontBold } from "./AppFontBold";

type AppButtonPropsType = {
  onPress: () => void;
  color?: string;
};

export const AppButton: React.FC<AppButtonPropsType> = ({
  children,
  onPress,
  color = THEME.MAIN_COLOR,
}) => {
  const Wrapper:any =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={onPress} activeOpacity={0.7}>
      <View style={{ ...styles.button, backgroundColor: color }}>
        <AppFontBold style={styles.text}>{children}</AppFontBold>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
