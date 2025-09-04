// src/App.tsx
import { useState, useEffect } from "react";
import type { Todo } from "./types/todo";
import { getTodos, createTodo, toggleTodoStatus, removeTodo, toggleTodoFavourite } from "./api/todo";
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [standardList, setStandard] = useState(true);

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
    });
  }, [] );

  const addTodo = () => {
    if (!title.trim()) return;
    createTodo(title, description, favourite).then((new_todo) => {
      // The task is only added when your are in favourite mode and is a favourite one or in standard list mode
      if((!standardList && favourite) || standardList)
        setTodos((prev) => [...prev, new_todo]);
      
    });
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setFavourite(false);
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toggleTodoStatus(id, todo.completed).then((updated) => {
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    });
  };

  const markTodoFavourite = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toggleTodoFavourite(id, todo.favourite).then((updated) => {
      // If we are in favourite mode and we unmarked as favourite then the task dissapear from the favourite list
      if(standardList)
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      else
        setTodos((prev) => prev.filter((t) => (t.id !== id)));
    });
  };

  const deleteTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    removeTodo(id).then(() => {
      setTodos((prev) => prev.filter((t) => (t.id !== id)));
    });
  };

  const checkFavouriteList = (status: boolean) => {
    setStandard(status);
    if (!status)
      setTodos((prev) => prev.filter((t) => (t.favourite === !status)));
    else
      getTodos().then((data) => {
        setTodos(data);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

        <TodoForm 
          title = {title} setTitle = {setTitle} description={description} setDescription={setDescription} 
          favourite={favourite} setFavourite={setFavourite} addTodo = {addTodo} clearForm={clearForm}
          />

        <TodoList todos={todos} favouriteList={standardList} toggleTodo={toggleTodo} deleteTodo={deleteTodo} markFavourite={markTodoFavourite} checkTypeList={checkFavouriteList} />

      </div>
    </div>
  );
}

export default App;
