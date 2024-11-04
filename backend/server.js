const express = require('express');
const app = express();
const cors = require('cors');

const ConnectDb = require('./dbConnect');
const employeeRouter = require('./routes/employeeRouter')
const uploadRouter = require('./routes/uploadRouter')
const userRouter = require('./routes/userRoutes');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use((req, res, next) => {
    if (req.method === 'GET') {
      return next();
    }
    return express.json()(req, res, next);
  });

app.use('/api/admin',userRouter );
app.use('/api/user', employeeRouter);
app.use('/api/upload', uploadRouter);



ConnectDb();


app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);   
})
