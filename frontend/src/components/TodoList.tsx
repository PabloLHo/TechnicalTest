import React from "react";
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import TodoTabs from "./TodoTabs"

interface TodoListProps {
  todos: Todo[];
  favouriteList: boolean
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  markFavourite: (id: string) => void;
  checkTypeList: (status: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, favouriteList, toggleTodo, deleteTodo, markFavourite, checkTypeList }) => {
  return (
    <>
      <TodoTabs favouriteList={favouriteList} checkTypeList={checkTypeList}  />
      <ul className="space-y-2">
        {todos.sort((a, b) => {
            return Number(b.favourite === true) - Number(a.favourite === true);
          }).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            markFavourite={markFavourite}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
