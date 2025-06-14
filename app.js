const express = require('express');
const env = require('dotenv');
const database = require('./config/database')
const taskRouter = require('./tasks/task.router')

env.config()

const app = express()

//serve static files from the 'public' directory
app.use(express.static('public'));

//connect to the database
database.connectDB();

app.use(express.json());
app.set('view engine', 'ejs');


const PORT =process.env.PORT||3000


app.listen(PORT, ()=>{
      console.log(`Todo app running at http://localhost:${PORT}`);
})
app.get('/health', (req,res)=>{
    res.send('OK')
})
app.get('/', (req, res) => {
  res.render('index', { todos: ['Dance', 'Eat', 'Sing'] });
});

app.use('/api/v1/tasks', taskRouter)