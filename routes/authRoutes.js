const express = require("express");
const router = express.Router();

const { searchMovie, createTask, getTasks, getTaskById, updateTaskById, deleteTaskById } = require("../controllers/authController");

router.get("/searchmovies", searchMovie);
router.post("/createtask",createTask);
router.get("/gettasks",getTasks);
router.get("/gettaskbyid/:id",getTaskById);
router.patch("/updatetaskbyid/:id",updateTaskById);
router.delete("/deletetaskbyid/:id",deleteTaskById);

module.exports = router;
