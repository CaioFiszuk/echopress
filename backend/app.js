const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const newsRoutes = require('./routes/news');
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/echopress")
.then(()=>{
  console.log("Database is successfully connected");
});

const { PORT = 3000 } = process.env;

app.use('/news', newsRoutes);
app.use('/users', usersRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));