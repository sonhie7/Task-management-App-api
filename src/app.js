
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const rateLimit = require('express-rate-limit');
const tasksRoute = require('./routes/tasksRoute');
const usersRoute = require('./routes/usersRoute');
const helmet = require('helmet');


const app = express();
app.use(helmet());
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next)=>{
  const{sanitize}=mongoSanitize;
  if(req.body)sanitize(req.body);
  if(req.query)sanitize(req.query);
  if(req.params)sanitize(req.params);
  next();
});

app.use((req, res, next)=>{
  const sanitize =(obj)=>{
    for(let key in obj){
      if(typeof obj[key]==='string')obj[key]=xss(obj[key]);
    }
  };
  if(req.body)sanitize(req.body);
  if(req.query)sanitize(req.query);
  if(req.params)sanitize(req.params);
  next();
});


const globalLimiter = rateLimit({
  windowMS:15*60*1000,
  max:100,
  message:"trop de requetes, veuillez ressayer plus tard",
  standardHeaders:true,
  legacyHeaders:false
});

//limiteur login
const loginLimiter = rateLimit({
  windowMS:15*60*1000,
  max:5
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));


app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API tasks !");
});
app.use(globalLimiter);
app.use('/api/tasks', tasksRoute);
app.use('/api/auth',loginLimiter, usersRoute);


module.exports = app;