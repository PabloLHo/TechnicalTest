// src/components/TodoForm.tsx
import React from "react";

interface TodoFormProps {
  title: string;
  description: string;
  favourite: boolean;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFavourite: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
  clearForm: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ title, setTitle, description, setDescription, favourite, setFavourite, addTodo, clearForm}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1 flex flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add the description for the task (Optional)..."
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 row-span-3"
      />
      </div>
      <div className="flex flex-col gap-2">
        <button
            onClick={addTodo}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
        >
            Add
        </button>
        <button
          onClick={(e) => setFavourite(!favourite)}
          className={`bg-orange-300 px-4 py-2 rounded-lg transition cursor-pointer ${favourite ? "text-yellow-800" : "text-white"}`}
        >
        ★
        </button>
        <button
            onClick={clearForm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
        >
            Clear
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
