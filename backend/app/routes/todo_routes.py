from fastapi import APIRouter
from app.models.todo import Todo, TodoCreate, TodoUpdate
from app.services.todo_service import load_todos, save_todos

import uuid

router = APIRouter()

@router.get("/todos", response_model=list[Todo])
def get_todos():
    """Get all todos."""
    return load_todos()


@router.post("/todos", response_model=Todo)
def add_todo(todo: TodoCreate):
    """
    Add a new todo.

    Args:
        todo (TodoCreate): The todo to add.
    """
    todos = load_todos()
    new_todo = Todo(id = str(uuid.uuid4()), title=todo.title, description=todo.description, completed=todo.completed, favourite=todo.favourite)
    todos.append(new_todo)
    save_todos(todos)
    return new_todo


@router.patch("/todos/{id}", response_model=Todo)
def edit_todo(id: str, todo: TodoUpdate):
    """
    Edit a todo.

    Args:
        id (str): The ID for the todo to edit
        todo (TodoUpdate): The todo to edit.
    """
    todos = load_todos()

    for t in todos:
        if t.id == id:
            update_data = todo.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(t, field, value)
            save_todos(todos)
            return t
        

@router.delete("/todos/{id}")
def delete_todo(id: str):
    """
    Delete a todo.

    Args:
        id (str): The ID for the todo to delete
    """
    todos = load_todos()

    for t in todos:
        if t.id == id:
            todos.remove(t)
            save_todos(todos)