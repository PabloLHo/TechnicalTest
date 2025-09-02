import json
import uuid
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DATA_FILE = Path(__file__).parent / "todos.json"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Todo(BaseModel):
    id: str
    title: str
    completed: bool = False

class TodoCreate(BaseModel):
    title: str
    completed: bool = False

class TodoUpdate(BaseModel):
    completed: bool



def load_todos() -> list[Todo]:
    """Load todos from the JSON file."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return [Todo(**todo) for todo in json.load(f)]


def save_todos(todos: list[Todo]):
    """
    Save todos to the JSON file.

    Args:
        todos (list[Todo]): List of Todo objects to save.
    """
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump([todo.model_dump() for todo in todos], f, indent=2)


@app.get("/todos", response_model=list[Todo])
def get_todos():
    """Get all todos."""
    return load_todos()


@app.post("/todos", response_model=Todo)
def add_todo(todo: TodoCreate):
    """
    Add a new todo.

    Args:
        todo (TodoCreate): The todo to add.
    """
    todos = load_todos()
    new_todo = Todo(id = str(uuid.uuid4()), title=todo.title, completed=todo.completed)
    todos.append(new_todo)
    save_todos(todos)
    return new_todo


@app.patch("/todos/{id}", response_model=Todo)
def edit_todo(id: str, todo: TodoUpdate):
    """
    Edit a todo.

    Args:
        id (str): The ID for the todo to edit
        todo (Todo): The todo to edit.
    """
    todos = load_todos()

    for t in todos:
        if t.id == id:
            t.completed = todo.completed
            save_todos(todos)
            return t
    
