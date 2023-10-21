const express = require('express') // Importing express for use in the file

const app = express(); // Creating an express app instance

const port = 3000; // The port we want our app to be accessed on


app.use(express.json()); // Middleware that will be used to parse JSON structures

// Setting up our "database" of tasks
let tasks = [
    {id: 1, name: 'Buy Groceries'},
    {id: 2, name: 'Take dog to the vet'},
];

// --- Read operations ---

app.get('/tasks', (req, res) => {
    res.json(tasks) // If we make a GET request to our localhost:3000/tasks, we should get the complete list of tasks
})

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Task not found');
    res.json(task);
})


// --- Read operations ---





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});