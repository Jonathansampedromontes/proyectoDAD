import { useReducer, useState } from "react";
import "./gestor.css";

// Estado inicial y reducer
const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      if (state.find((task) => task.text === action.payload)) {
        alert("La tarea ya existe");
        return state;
      }
      return [...state, { id: Date.now(), text: action.payload }];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

// Componente de entrada de tareas (TaskInput)
const TaskInput = ({ dispatch }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (!task.trim()) {
      alert("La tarea no puede estar vacía");
      return;
    }
    dispatch({ type: "ADD_TASK", payload: task });
    setTask(""); // Limpia el input
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Escribe una tarea"
      />
      <button onClick={handleAddTask}>Agregar Tarea</button>
    </div>
  );
};

// Componente de lista de tareas (TaskList)
const TaskList = ({ tasks, dispatch }) => {
  if (tasks.length === 0) {
    return <p className="nohaylista">No hay tareas en la lista.</p>;
  }

  return (
    <ol className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          {task.text}
          <button
            onClick={() => {
              if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
                dispatch({ type: "DELETE_TASK", payload: task.id });
              }
            }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ol>
  );
};

// Componente principal (Gestor de tareas)
const TaskApp = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      {/* Input para agregar tareas */}
      <TaskInput dispatch={dispatch} />
      {/* Lista para mostrar y eliminar tareas */}
      <TaskList tasks={tasks} dispatch={dispatch} />
    </div>
  );
};

export default TaskApp;