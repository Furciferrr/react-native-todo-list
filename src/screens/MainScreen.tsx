import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppButton } from "../components/ui/AppButton";
import { AppFontBold } from "../components/ui/AppFontBold";
import { AppLoader } from "../components/ui/AppLoader";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";



export const MainScreen: React.FC<{}> = () => {
  const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
  const {changeScreen} = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])
  useEffect(() => {
    loadTodos()
  },[]);  
  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);
    return () => {
      Dimensions.removeEventListener("change", update);
    }
  });
  if (loading) {
    return <AppLoader />
  }
  if(error) {
    return <View style={styles.center}>
      <AppFontBold style={styles.error}>{error}</AppFontBold>
      <AppButton onPress={loadTodos}>Reload</AppButton>
      </View>
  }
  let content = (
    <View style={{ width: deviceWidth, flex: 1 }}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/no-items.png")}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <AddTodo addTodo={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
});
