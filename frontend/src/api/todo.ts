import type { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8000/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error fetching todos");
  return res.json();
};

export const createTodo = async (title: string, description: string, favourite: boolean): Promise<Todo> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, completed: false, favourite }),
  });
  if (!res.ok) throw new Error("Error adding todo");
  return res.json();
};

export const toggleTodoStatus = async (
  id: string,
  currentStatus: boolean
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !currentStatus }),
  });
  if (!res.ok) throw new Error("Error toggling todo status");
  return res.json();
};

export const toggleTodoFavourite = async (
  id: string,
  currentStatus: boolean
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favourite: !currentStatus }),
  });
  if (!res.ok) throw new Error("Error changing favourite todo status");
  return res.json();
};

export const removeTodo = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting todo");
};
