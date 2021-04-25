import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Keyboard } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { THEME } from "../theme";

type AddTodoPropsType = {
  addTodo: (title: string) => void;
};

export const AddTodo: React.FC<AddTodoPropsType> = (props) => {
  const [value, setValue] = useState<string>("");

  const onPressHandler = () => {
    if (value.trim()) {
      props.addTodo(value);
      setValue("");
      Keyboard.dismiss()
    } else {
      Alert.alert("task empty");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="add your task"
        onChangeText={setValue}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <AntDesign.Button onPress={onPressHandler} name='pluscircleo'>
       add
        </AntDesign.Button>
     
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "70%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
