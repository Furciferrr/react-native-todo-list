import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TodoItemType } from "./../../App";
import { AppFont } from "./ui/AppFontRegular";

type TodoPropsType = {
  todo: TodoItemType;
  onRemove: (id: string) => void
  onOpen: (id: string) => void
};

export const Todo: React.FC<TodoPropsType> = (props) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={() => {props.onOpen(props.todo.id)}}
        onLongPress={() => {props.onRemove(props.todo.id)}}
        >
      <View style={styles.todo}>
        <AppFont style={styles.text}>{props.todo.title}</AppFont>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {},
});
