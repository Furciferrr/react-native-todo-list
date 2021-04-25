import React, { useContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { TodoItemType } from "../../App";
import { EditModal } from "../components/EditModal";
import { AppButton } from "../components/ui/AppButton";
import { AppCard } from "../components/ui/AppCard";
import { AppFontBold } from "../components/ui/AppFontBold";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";



export const TodoScreen: React.FC<{}> = () => {
  const {todos, updateTodo, removeTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)
  const todo = todos.find((t: TodoItemType) => t.id === todoId)
  const [modal, setModal] = useState<boolean>(false);
  const saveEditedTask = async (title: string) => {
    await updateTodo(todo.id, title);
    setModal(false);
  };
  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        value={todo.title}
        onSave={saveEditedTask}
      />
      <AppCard style={styles.card}>
        <AppFontBold style={styles.title}>{todo.title}</AppFontBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttonsWrapper}>
        <View style={styles.button}>
          <AppButton onPress={()=>{changeScreen(null)}} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => {
              removeTodo(todo.id);
            }}
          >
            <AntDesign name="delete" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: Dimensions.get('window').width / 3,
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
});
