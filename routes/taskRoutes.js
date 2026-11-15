
const express = require("express");
const router = express.Router();

const { getTasks, saveTasks } = require("../utils/taskStorage");

// GET - Tüm görevleri listele
router.get("/", (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

// GET - ID'ye göre görev detayı
router.get("/:id", (req, res) => {
  const tasks = getTasks();
  const taskId = Number(req.params.id);

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Görev bulunamadı"
    });
  }

  res.json(task);
});

// POST - Yeni görev oluştur
router.post("/", (req, res) => {
  const tasks = getTasks();

  const newTask = {
    id: tasks.length > 0
      ? Math.max(...tasks.map(task => task.id)) + 1
      : 1,
    title: req.body.title,
    description: req.body.description,
    assignee: req.body.assignee,
    priority: req.body.priority || "medium",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
});

// PUT - Görev güncelle
router.put("/:id", (req, res) => {
  const tasks = getTasks();
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex(
    task => task.id === taskId
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Görev bulunamadı"
    });
  }

  const currentTask = tasks[taskIndex];

  const updatedTask = {
    ...currentTask,
    title: req.body.title ?? currentTask.title,
    description: req.body.description ?? currentTask.description,
    assignee: req.body.assignee ?? currentTask.assignee,
    priority: req.body.priority ?? currentTask.priority,
    status: req.body.status ?? currentTask.status
  };

  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);

  res.json(updatedTask);
});

// DELETE - Görev sil
router.delete("/:id", (req, res) => {
  const tasks = getTasks();
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex(
    task => task.id === taskId
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Görev bulunamadı"
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  saveTasks(tasks);

  res.json({
    message: "Görev başarıyla silindi",
    deletedTask: deletedTask
  });
});

module.exports = router;
