const prisma = require("../prisma");

//Used to search for a movie
const searchMovie = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
    }

    //we get a HTTP response
    const response = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_API_KEY}&t=${encodeURIComponent(title)}&plot=full`,
    );

    //the HTTP response is converted to JSON format
    const data = await response.json();

    if (data.Response === "False") {
      res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      title: data.Title,
      year: data.Year,
      plot: data.Plot,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      poster: data.Poster,
      imdbId: data.imdbID,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error searching movies" });
  }
};

//Used to create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, category, movieId } = req.body;

    if (!title || !description || !category || !movieId) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const task = await prisma.task.create({
      data: { title, description, category, movieId },
    });
    res.status(200).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error creating task" });
  }
};

//Used to get all tasks with optional filtering by status and category
const getTasks = async (req, res) => {
  try {
    const { status, category } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = {
        contains: category,
        mode: "insensitive",
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      count: tasks.length,
      tasks,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

//Used to get a task by its ID
const getTaskById = async (req, res) => {
    try{
        const{id}=req.params;
        const task = await prisma.task.findUnique({
            where: { id: Number(id) },
        });

        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ message: "Error fetching task by ID" });
    }
}

//Used to update a task by its ID
const updateTaskById=async(req,res)=>{
    try{
        const{id}=req.params

        const{title,description,category,status}=req.body

        const task= await prisma.task.update({
            where:{
                id:Number(id)
            },
            data:{
                title,description,category,status
            }
        })

        res.status(200).json({
            message:"Task updated successfully",
            task
        })
    }
    catch(err){
        console.log("err.message")

        res.status(500).json({
            message:"Error updating task by ID"
        })
    }
}

//Used to delete a task by its ID
const deleteTaskById=async(req,res)=>{
  try{
    const{id}=req.params

    const task=await prisma.task.delete({
      where:{
        id:Number(id)
      }
    })

    res.status(200).json({
      message:"Task deleted successfully",
      task
    })
  }
  catch(err){
    console.log(err.message)

    res.status(500).json({
      message:"Error deleting task by ID"
    })
  }
}


module.exports = { searchMovie, createTask, getTasks, getTaskById, updateTaskById,deleteTaskById };
