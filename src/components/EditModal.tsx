import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

type EditModalPropsType = {
  visible: boolean;
  onCancel: () => void;
  value: string;
  onSave: (t: string) => void;
};

export const EditModal: React.FC<EditModalPropsType> = (props) => {
  const [title, setTitle] = useState<string>(props.value);
  const saveHandler = () => {
    if (title.trim()) {
      props.onSave(title);
    } else {
      Alert.alert("task can not empty");
    }
  };
  const cancelHandler = () => {
    setTitle(props.value)
    props.onCancel()
  }
  return (
    <Modal visible={props.visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton
            onPress={cancelHandler}
            color={THEME.DANGER_COLOR}
          >Cancel</AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
