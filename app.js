const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  

let employees = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add.html'));
});

app.get('/update/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
});

app.get('/employee/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'employee.html'));
});

app.get('/api/employee/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

app.post('/api/add', (req, res) => {
    const { name, position, department } = req.body;
    const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    const newEmployee = { id, name, position, department };
    employees.push(newEmployee);
    res.redirect('/');
});

app.put('/api/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, position, department } = req.body;
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        employee.name = name;
        employee.position = position;
        employee.department = department;
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});



app.delete('/api/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = employees.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        employees.splice(userIndex, 1);
        res.json({ message: 'Employee deleted successfully' });  
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});


app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
