from pydantic import BaseModel
from typing import Optional

class Todo(BaseModel):
    id: str
    title: str
    description: str
    completed: bool = False
    favourite: bool

class TodoCreate(BaseModel):
    title: str
    description: str
    completed: bool = False
    favourite: bool = False

class TodoUpdate(BaseModel):
    completed: Optional[bool] = None
    favourite: Optional[bool] = None