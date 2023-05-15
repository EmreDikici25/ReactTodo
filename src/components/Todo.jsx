import React from "react";

const Todo = ({
  todo,
  handleDelete,
  handleDone,
  setShowModal,
  setEditingTodo,
}) => {
  return (
    <div className="border shadow p-2 rounded d-flex justify-content-between align-items-center rounded">
      <div className="d-flex flex-column gap-2">
        <h5
          style={{
            textDecoration: todo.isDone ? "line-through" : "none",
            color: todo.isDone ? "red" : "black",
          }}
        >
          {todo.title}
        </h5>
        <p>{todo.date}</p>
      </div>
      <div className="btn-group">
        <button
          className="btn btn-danger"
          onClick={() => {
            handleDelete(todo);
          }}
        >
          Sil
        </button>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Düzenle
        </button>
        <button className="btn btn-success" onClick={() => handleDone(todo)}>
          {todo.isDone ? "Yapıldı" : "Yapılacak"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
