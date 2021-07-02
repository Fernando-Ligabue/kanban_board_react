import { useState } from 'react';
import logo from './logo.svg';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Tasklist from './components/TaskList/TaskList';

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};


function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };
  
  const deleteTask = (id) => {
    setTasks((exitingTasks) => {
      return exitingTasks.filter((task) => task.id !== id);
    });
  };
  
  return (
    <div className="App">
      <Navbar />
      <h1> Simple kanban board to help organize your daily tasks!</h1>
            <img src={logo} className="App-logo" alt="logo" />

      <div className="container">
        <Tasklist
          title="Pending"
          onAddTask={addTask}
          taskState="Pending"
          tasks={tasks.filter((t) => t.state === "Pending")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <Tasklist
          title="To Do"
          onAddTask={addTask}
          taskState="To Do"
          tasks={tasks.filter((t) => t.state === "To Do")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <Tasklist
          title="Concluded"
          onAddTask={addTask}
          taskState="Concluded"
          tasks={tasks.filter((t) => t.state === "Concluded")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;