const express = require('express');
const { v4: uuidv4 } = require('uuid');  // Use ES6 destructuring to import uuid.v4

// Mock data to simulate a list of todos
let fakeTodos = [
    { id: '123', text: 'Go to the grocery store', isCompleted: false },
    { id: '234', text: 'Learn full-stack development', isCompleted: true }
];

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies in requests

// Endpoint to get all todos
app.get('/todos', (req, res) => {
    res.json(fakeTodos); // Respond with the current list of todos
});

// Endpoint to add a new todo
app.post('/todos', (req, res) => {
    const newTodoText = req.body.newTodoText;  // Extract the new todo text from the request body
    const newTodo = {
        text: newTodoText,
        isCompleted: false,
        id: uuidv4()  // Generate a unique ID for the new todo
    };
    fakeTodos.push(newTodo); // Add the new todo to the fakeTodos array
    res.json(newTodo); // Respond with the newly created todo
});

// Endpoint to update the completion status of a specific todo
app.patch('/todos/:todoId', (req, res) => {
    const todoId = req.params.todoId; // Extract the todo ID from the request parameters
    const todo = fakeTodos.find(t => t.id === todoId); // Find the todo with the given ID

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" }); // Respond with 404 if not found
    }

    todo.isCompleted = req.body.completed; // Update the `isCompleted` property based on the request body
    res.json(todo); // Respond with the updated todo
});

// Endpoint to delete a specific todo
app.delete('/todos/:todoId', (req, res) => {
    const todoId = req.params.todoId; // Extract the todo ID from the request parameters
    const initialLength = fakeTodos.length;
    fakeTodos = fakeTodos.filter(todo => todo.id !== todoId); // Remove the todo with the given ID from the array

    if (fakeTodos.length === initialLength) {
        return res.status(404).json({ error: "Todo not found" }); // Respond with 404 if no todo was deleted
    }

    res.status(204).end(); // Send a 204 No Content response if deletion was successful
});

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
