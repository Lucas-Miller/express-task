const express = require('express') // Importing express for use in the file

const app = express(); // Creating an express app instance

const port = 3000; // The port we want our app to be accessed on


app.use(express.json()); // Middleware that will be used to parse JSON structures

// Setting up our "database" of tasks
let tasks = [
    {id: 1, name: 'Buy Groceries'},
    {id: 2, name: 'Take dog to the vet'},
];


// --- (POST) Create Operations ---

// POST request to create a new task with the text given in the request
app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        name: req.body.name,
    };
    tasks.push(task);
    res.json(task);
})

// --- (POST) Create Operations ---


// --- (GET) Read operations ---

// GET request to get all tasks in the tasks array
app.get('/tasks', (req, res) => {
    res.json(tasks) 
})

// GET request to get the task with the specified id
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Task not found');
    res.json(task);
})

// --- (GET) Read operations ---




// --- (PUT) Update Operations ---

// Update the name of the task that has the given id with the name specificed in the request body.
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Task not found');
    
    task.name = req.body.name;
    res.json(task);
})

// --- (PUT) Update Operations  ---


// --- (PATCH) Update Operations ---

// Update any of the properties given in the request
// *Note: This is just an example and in practice this
//        would be role protected to an admin role.
app.patch('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Task not found');
    
    if(req.body.name) {
        task.name = req.body.name;
    }

    if(req.body.id) {
        task.id = req.body.id;
    }

    res.json(task);
})

// --- (PATCH) Update Operations  ---

// --- (DELETE) Delete Operations ---

app.delete('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Task not found');

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.json(task);
})

// --- (DELETE) Delete Operations ---





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});