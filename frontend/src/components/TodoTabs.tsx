import React from "react";
import type { Todo } from "../types/todo";


interface TodoTabsProps {
  favouriteList: boolean
  checkTypeList: (status: boolean) => void;
}

const TodoTabs: React.FC<TodoTabsProps> = ({ favouriteList, checkTypeList }) => {

      return (

        <div className="flex px-1 gap-2">
        
        <button
          onClick={() => checkTypeList(true)}
          className={`${favouriteList ? "bg-gray-300 font-bold" : "bg-white hover:bg-black hover:text-white"} px-4 py-2 rounded-t-lg transition cursor-pointer`}
        >
        All Tasks 📋
        </button>

        <button
          onClick={() => checkTypeList(false)}
          className={`${favouriteList ? "bg-white hover:bg-black hover:text-white" : "bg-gray-300 font-bold"} px-4 py-2 rounded-t-lg transition cursor-pointer`}
        >
        Favourites 🌟
        </button>

      </div>

      );

};

export default TodoTabs;