const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addTask(taskId, text, priority, tasks) {
  const taskObj = {
    taskId,
    text,
    priority,
  };
  tasks.push(taskObj);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = req.query.priority;
  const copyTask = [...tasks];
  const result = addTask(taskId, text, priority, copyTask);
  return res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  return res.json({ tasks: tasks });
});

function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  const copyTask = [...tasks];
  const result = copyTask.sort(sortTaskByPriority);
  return res.json({ tasks: result });
});

function updateTask(tasks, taskId, value, prop) {
  return tasks.map((task) =>
    task.taskId === taskId ? { ...task, [prop]: value } : task
  );
}

app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);
  const copyTask = [...tasks];
  const result = updateTask(copyTask, taskId, priority, 'priority');
  return res.json({ tasks: result });
});

app.get('/tasks/edit-text', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const copyTask = [...tasks];
  const result = updateTask(copyTask, taskId, text, 'text');
  return res.json({ tasks: result });
});

function deleteTask(tasks, taskId) {
  return tasks.filter((task) => task.taskId !== taskId);
}

app.get('/tasks/delete', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const copyTask = [...tasks];
  const result = deleteTask(copyTask, taskId);
  return res.json({ tasks: result });
});

function filterTaskByPriorty(tasks, priority) {
  return tasks.filter((task) => task.priority === priority);
}

app.get('/tasks/filter-by-priority', (req, res) => {
  const priority = parseInt(req.query.priority);
  const copyTask = [...tasks];
  const result = filterTaskByPriorty(copyTask, priority);
  return res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
