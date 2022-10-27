import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../api/url";
import InputBox from "../../components/InputBox";
import ToDoItemList from "../../components/TodoItemList";

const Home = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(1);
  const nextId = useRef(0);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate(`/`);
    }
  });

  const getTodo = () => {
    axios
      .get(API.TODO, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((result) => {
        console.log(result);
        setTodoList(result.data);
        setTodos(result.data);
      });
  };

  const insertTodo = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        todo: text,
        iscompleted: false,
      };

      fetch(API.TODO, {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
        mode: "cors",
      })
        .then((response) => {
          getTodo();
        })
        .then((result) => {
          setTodos(result);
          setId(id + 1);
          // setTodos(todos.concat(todos));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [todos, id]
  );

  const deleteTodo = useCallback((id) => {
    axios({
      method: "delete",
      url: `${API.TODO}/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      getTodo();
    });
  });

  const updateTodo = useCallback((text, id, isCompleted) => {
    fetch(`${API.TODO}/${id}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: text, isCompleted: isCompleted }),
    })
      .then((response) => {
        console.log(response);
        getTodo();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  useEffect(() => {
    getTodo();
  }, []);

  const onChecked = (id, todo, iscompleted) => {
    setTodos(
      todos.map((item) => {
        return item.id === id
          ? { ...item, iscompleted: !item.iscompleted }
          : item;
      })
    );
    updateTodo(todo, id, !iscompleted);
    console.log(id, todo, iscompleted);
  };

  return (
    <div className="homepage-container">
      <span className="homepage-title">TODO LIST</span>
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox
        todoList={todoList}
        setTodoList={setTodoList}
        insertTodo={insertTodo}
      />
      {/* 할 일 Item 리스트 */}
      <ToDoItemList
        title={"할 일"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false} // (체크되지 않은) 할 일 목록
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        onChecked={onChecked}
      />
      {/* 완료한 Item 리스트 */}
      <ToDoItemList
        title={"완료한 항목"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true} // (체크되어 있는)완료한 목록
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        onChecked={onChecked}
      />
    </div>
  );
};

export default Home;
