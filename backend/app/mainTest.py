from fastapi.testclient import TestClient
from .main import app


client = TestClient(app)


def test_add_todo():
    res = client.post("/todos", json={"title": "Learn Kubernetes", "completed": False})

    assert res.status_code == 200
    added = res.json()

    assert not added["completed"]
    assert added["id"]
    assert added["title"] == "Learn Kubernetes"

def test_update_todo():
    # f0ad43ba-b205-4afc-a9ad-7e2be1862d40 links with Learn React which default value es True
    id = "f0ad43ba-b205-4afc-a9ad-7e2be1862d40"
    res = client.patch(f"/todos/{id}", json={"completed": False})

    assert res.status_code == 200
    updated = res.json()

    assert updated["id"] == id
    assert not updated["completed"]

    res = client.patch(f"/todos/{id}", json={"favourite": False})

    assert res.status_code == 200
    updated = res.json()

    assert updated["id"] == id
    assert not updated["favourite"]

def test_delete_todo():

    res_add = client.post("/todos", json={"title": "Learn Kubernetes", "completed": False})
    assert res_add.status_code == 200
    added = res_add.json()

    id = added["id"]

    res_delete = client.delete(f"/todos/{id}")
    assert res_delete.status_code == 200

    res = client.get("/todos")
    assert res_add.status_code == 200
    todos = res.json()

    assert all(todo["id"] != id for todo in todos)



