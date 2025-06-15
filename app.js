const express = require('express');
const env = require('dotenv');
const database = require('./config/database')
const taskRouter = require('./tasks/task.router')
const userRouter = require('./users/user.router')
const authRouter = require('./auth/auth.router')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');


env.config()

const app = express()

//serve static files from the 'public' directory
app.use(express.static('public'));

//connect to the database
database.connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))



const PORT =process.env.PORT||3000


app.listen(PORT, ()=>{
      console.log(`Todo app running at http://localhost:${PORT}`);
})
app.get('/health', (req,res)=>{
    res.send('OK')
})
;

// app.get('/', (req, res) => {
//   res.render('index', { todos: ['Dance', 'Eat', 'Sing'] });
// });
app.get('/', (req, res) => {
  res.render('signup',{error: "Sth went wrong"});
});

app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)