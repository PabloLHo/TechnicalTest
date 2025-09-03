import React from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  markFavourite: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, markFavourite }) => {
  return (
    <li
      key={todo.id}
      className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200"
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="cursor-pointer"
      />
      <div className="flex-1 flex flex-col justify-between gap-2">
        <span
          className={` ${todo.completed ? "line-through text-gray-400" : ""}`}
        >
          {todo.title}
        </span>
        <span
          className="text-sm text-gray-400"
        >
          {todo.description}
        </span>
      </div>
      <div className="flex ml-auto gap-2">
        <button
          onClick={() => markFavourite(todo.id)}
          className={`bg-orange-300 hover:bg-orange-700 px-4 py-2 rounded-lg transition cursor-pointer ${todo.favourite ? "text-yellow-800" : "text-white"}`}
        >
        ★
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
        >
          Delete
        </button>
    </div>
    </li>
  );
};

export default TodoItem;
