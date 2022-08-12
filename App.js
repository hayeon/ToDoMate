import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";


const STORAGE_KEY = "@toDoList";

function App() {
  const [headerToggle, setHeaderToggle] = useState("work"); //work인지 travel인지 
  const work = () => setHeaderToggle("work"); 
  const travel = () => setHeaderToggle("travel");
  const [toDo, setTodo] = useState("");
  const [toDoList, setTodoList] = useState({}); //hasmap을 만들기 위해 배열이 아닌 obj
  const getToDOList = async() => { //ToDoList를 가져오는 함수
    const storageData = await AsyncStorage.getItem(
      STORAGE_KEY,
      JSON.stringify(storageData));
      setTodoList(JSON.parse(storageData));
    };
  
  useEffect(() =>{getToDOList()}, []);
 
  //toDo를 storage에 저장하는 함수, onSubmit을 했을 때 실행됨


  const saveToDoList = async (toSet) => { //toDoList를 string으로 변환, await AsyncStorage.setItem을 해줌 x는 onSubmit을 통해 setToDoList에 전달
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(toSet));
  };
  const onChange = (e) => setTodo(e);
  
  const onSubmit = async () => {
    if (toDo === "") {
      //toDo가 공백이면
      return;
    }; 
    const newToDoList = { ...toDoList, [Date.now()]: { toDo, headerToggle } };
    setTodoList(newToDoList);
    await saveToDoList(newToDoList);
    setTodo(""); //toDo가 공백이 아니면
  };

  //toDo 삭제
  const deleteToDo = (key) => {
    Alert.alert("알림", "투두를 삭제하시겠습니까?", [
      {text:"삭제하기", onPress : () => {
        const newToDoList = { ...toDoList}; //새로운 obj를 복사
        delete newToDoList[key]; //새로운 obj의 key를 삭제
        setTodoList(newToDoList); //위에서 삭제된 obj를 제외하고 다시 setTodoList
        saveToDoList(newToDoList);
      }}, 
      {text:"취소"}
    ] )
    
  };

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


      {/* 스크롤 뷰에 작성 투두리스트 출력 */}
      <ScrollView> 
        {/* 컴포넌트에 key값을 넣어주기 위해 반복문으로 여러 컴포넌트를 렌더링 할 때 각 컴포넌트 고유값을 전달해야함 */}
        {Object.keys(toDoList).map((key) =>
            toDoList[key].headerToggle === headerToggle ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDoList[key].toDo}</Text>
               <TouchableOpacity onPress={()=> deleteToDo(key)}>
               <Text>🗑️</Text>
               </TouchableOpacity>
              </View>
            ) : null
        )}
      </ScrollView>
    </View>
  );
};








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
    flexDirection: "row",
    alignContent: "center",
  justifyContent: "space-between",  },
  toDoText: {
    fontSize: 18,
    color: "white",
  },
});

export default App;
