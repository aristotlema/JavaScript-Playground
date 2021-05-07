const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json()); // => req.body with json data

//Routes//

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a todo
app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query(
            `SELECT * FROM todo WHERE todo_id = ${id}`
        );
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]

        );
        res.json(newTodo.rows[0]).status(203);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params; // WHERE
        const { description } = req.body; // SET
        
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("object updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json('Todo deleted');
    } catch {
        console.error(err.message);
    }
});


app.listen(3001, () => {
    console.log('server runing on port 3001');
});