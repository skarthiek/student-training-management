// Import express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import for unique ID

// Create express app
const app = express();

// Use express.json middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://saravanakarthiek39:Karthiek123@myfirstcluster.epffo.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


//college schema
const collegeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  program: { type: [String], required: true },
});
// Model for college
const College = mongoose.model("College", collegeSchema);
// POST route to submit college
app.post("/api/college", async (req, res) => {
  try {
    const { college, program } = req.body;

    // Create a new college entry
    const newCollege = new College({
      id: uuidv4(),
      college,
      program,
    });

    // Save college to the database
    await newCollege.save();
    res.status(201).json({ message: "College submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit college" });
  }
});
// GET route to fetch all colleges
app.get("/api/college", async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch colleges" });
  }
});
// DELETE program


//prerecquite schema
  const prerequisiteSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    msg: { type: String, required: true },
    src: { type: String, required: true }
  });
// Model for prerequisite
const Prerequisite = mongoose.model("Prerequisite", prerequisiteSchema);

// POST route to submit prerequisite
app.post("/api/prerequisite", async (req, res) => {
  try {
    const {
      msg,
      src
    } = req.body;

    // Create a new prerequisite entry
    const newPrerequisite = new Prerequisite({
      id: uuidv4(),
      msg,
      src
    });

    // Save prerequisite to the database
    await newPrerequisite.save();
    res.status(201).json({ message: "Prerequisite submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit prerequisite" });
  }
});
// GET route to fetch all prerequisites
app.get("/api/prerequisite", async (req, res) => {
  try {
    const prerequisites = await Prerequisite.find();
    res.status(200).json(prerequisites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch prerequisites" });
  }
});
// delete prerequisites

// DELETE route to delete a prerequisite by ID
// DELETE route to delete all prerequisites
app.delete("/api/prerequisite", async (req, res) => {
  try {
    // Remove all prerequisites from the collection
    await Prerequisite.deleteMany();

    res.status(200).json({ message: "All prerequisites deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete prerequisites" });
  }
});

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, required: true }, // Corrected `Date` type
  college: { type: String, required: true },
  program: { type: String, required: true },
  content: { type: String, required: true },
  improve: { type: String },
  rating: { type: Number, min: 1, max: 5 }, // Use `Number` and restrict to valid range
});

// Model for feedback
const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST route to submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const {
      date,
      college,
      program,
      content,
      improve,
      rating,
    } = req.body;

    // Create a new feedback entry
    const newFeedback = new Feedback({
      id: uuidv4(),
      date: new Date(date), // Ensure the date is properly parsed
      college,
      program,
      content,
      improve,
      rating,
    });

    // Save feedback to the database
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

// GET route to fetch all feedback
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
});
//task schema
const taskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  task: { type: String, required: true },
  date: { type: Date, required: true },
});
// Model for task
const Task = mongoose.model("Task", taskSchema);
// POST route to submit task
app.post("/api/task", async (req, res) => {
  try {
    const { task, date } = req.body;

    // Create a new task entry
    const newTask = new Task({
      id: uuidv4(),
      task,
      date: new Date(date),
    });

    // Save task to the database
    await newTask.save();
    res.status(201).json({ message: "Task submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit task" });
  }
});
// GET route to fetch all tasks
app.get("/api/task", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});
// DELETE route to delete all tasks
app.delete("/api/task", async (req, res) => {
  try {
    // Remove all tasks from the collection
    await Task.deleteMany();

    res.status(200).json({ message: "All tasks deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete tasks" });
  }
});
// notes schema
const notesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
});
// Model for notes
const Notes = mongoose.model("Notes", notesSchema);
// POST route to submit notes
app.post("/api/notes", async (req, res) => {
  try {
    const { title, link } = req.body;

    // Create a new notes entry
    const newNotes = new Notes({
      id: uuidv4(),
      title,
      link,
    });

    // Save notes to the database
    await newNotes.save();
    res.status(201).json({ message: "Notes submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit notes" });
  }
});
// GET route to fetch all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});
// DELETE route to delete all notes
app.delete("/api/notes", async (req, res) => {
  try {
    // Remove all notes from the collection
    await Notes.deleteMany();

    res.status(200).json({ message: "All notes deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete notes" });
  }
});
//resource schema
const resourceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
});
// Model for resource
const Resource = mongoose.model("Resource", resourceSchema);
// POST route to submit resource
app.post("/api/resource", async (req, res) => {
  try {
    const { title, link } = req.body;

    // Create a new resource entry
    const newResource = new Resource({
      id: uuidv4(),
      title,
      link,
    });

    // Save resource to the database
    await newResource.save();
    res.status(201).json({ message: "Resource submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit resource" });
  }
});
// GET route to fetch all resources
app.get("/api/resource", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});
// DELETE route to delete all resources
app.delete("/api/resource", async (req, res) => {
  try {
    // Remove all resources from the collection
    await Resource.deleteMany();

    res.status(200).json({ message: "All resources deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete resources" });
  }
});


// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});