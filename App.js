import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";


const STORAGE_KEY = "@toDoList";

function App() {
  const [headerToggle, setHeaderToggle] = useState("work");
  const work = () => setHeaderToggle("work");
  const travel = () => setHeaderToggle("travel");
  const [toDo, setTodo] = useState("");
  const [toDoList, setTodoList] = useState({}); //hasmap을 만들기 위해 배열이 아닌 obj
  //toDo를 storage에 저장하는 함수, onSubmit을 했을 때 실행됨
  const setToDoList = async (toDo) => { //toDoList를 string으로 변환, await AsyncStorage.setItem을 해줌 x는 onSubmit을 통해 setToDoList에 전달
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(toDo));
  };
  // const getToDOList = async() => {
  //   const s = await AsyncStorage.getItem(
  //     STORAGE_KEY,
  //     JSON.stringify(x))
  //   console.log(s);
  // };
  const onChange = (e) => setTodo(e);
  const onSubmit = async () => {
    if (toDo === "") {
      //toDo가 공백이면
      return;
    }
    const newToDoList = { ...toDoList, [Date.now()]: { toDo, headerToggle } };
    // Object.assign({}, toDoList, {
    //   [Date.now()]: { toDo, toggle: headerToggle },
    // });
    setTodoList(newToDoList);
    setToDoList(newToDoList);
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
          // 토글에 따라 기본글씨값이 다름
          headerToggle === "work"
            ? "오늘의 할 일을 정리하세요"
            : "어디로 떠나고 싶으세요?"
        }
        style={{ ...styles.input }}
      />
      <ScrollView>
        {/* 컴포넌트에 key값을 넣어주기 위해 반복문으로 여러 컴포넌트를 렌더링 할 때 각 컴포넌트 고유값을 전달해야함 */}
        {Object.keys(toDoList).map(
          (
            key //토글이 같은 경우에만 보여줌
          ) =>
            toDoList[key].headerToggle === headerToggle ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDoList[key].toDo}</Text>
              </View>
            ) : null
        )}
      </ScrollView>
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
    marginVertical: 20,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    fontSize: 18,
    color: "white",
  },
});

export default App;
