import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "./theme";

function App() {
  const [headerToggle, setHeaderToggle] = useState("work");
  const work = () => setHeaderToggle("work");
  const travel = () => setHeaderToggle("travel");
  const [toDo, setTodo] = useState("");
  const [toDoList, setTodoList] = useState({}); //hasmap을 만들기 위해 배열이 아닌 obj
  const onChange = (e) => setTodo(e);
  const onSubmit = () => {
    if (toDo === "") {
      //toDo가 공백이면
      return;
    }
    const newToDoList = Object.assign({}, toDoList, {
      [Date.now()]: { toDo, toggle: headerToggle },
    });
    setTodoList(newToDoList);
    setTodo(""); //toDo가 공백이 아니면
  };
  console.log(toDoList);

 
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* 터치시 발생하는 이벤트 */}
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.headerText,
              color: headerToggle === "work" ? "rgb(255,255,255)" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.headerText,
              color:
                headerToggle === "travel" ? "rgb(255,255,255)" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={onSubmit}
        value={toDo}
        onChangeText={onChange}
        returnKeyType="done"
        placeholder={
          headerToggle === "work"
            ? "오늘의 할 일을 정리하세요"
            : "어디로 떠나고 싶으세요?"
        }
        style={{ ...styles.input }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    fontSize: 20,
  },
});

export default App;
