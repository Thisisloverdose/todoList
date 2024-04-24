import React, { useState, useEffect } from 'react';

function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (event) => {
    event.preventDefault();
    if (task.trim()) {
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTask('');
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  const handleToggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleModifyTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
  };

  const handleSaveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingTask.text } : task
      )
    );
    setEditingTask(null);
  };

  const createdTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <div>
        <div>Created tasks: {createdTasks}</div>
        <div>Completed tasks: {completedTasks} / {createdTasks}</div>
      </div>
      <ul>
        {tasks.map((task) => (
          <div className="taskadded">
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task.id)}
              />
              {editingTask && editingTask.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTask.text}
                    onChange={(event) =>
                      setEditingTask({ ...editingTask, text: event.target.value })
                    }
                  />
                  <button type="button" onClick={() => handleSaveTask(task.id)}>
                    Save
                  </button>
                </>
              ) : (
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              )}
              <button type="button" onClick={() => handleModifyTask(task.id)}>
                🖉
              </button>
              <button type="button" onClick={() => handleRemoveTask(task.id)}>
                🗑
              </button>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
