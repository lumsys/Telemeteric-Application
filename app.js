const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3333;


//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors)

require('dotenv/config');
const api = process.env.API_URL;


//Routes
const telemetricRouter = require('./router/telemetric');
const router = require('./router/telemetric');

app.use(`${api}/telemetric`, telemetricRouter)



//connections
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready ...')
})
.catch((err)=>{
    console.log(err);
})

app.listen(PORT, ()=>{
    console.log(api);
    console.log('server is running http://localhost:'+ PORT); 

})
