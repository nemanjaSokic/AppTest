import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskCtrl from './controllers/taskController';
import userCtrl from './controllers/userController';
import authCtrl from './controllers/authController';

//MongoDB
var mongoose = require('mongoose');


const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://nemanja:rootroot123@ds229186.mlab.com:29186/tasks',{
    useNewUrlParser: true
});
mongoose.connection.once('open', function(){
    console.log('Connection has been made...');
}).on('error', function(error){
    console.log('Connection error: ' + error);
});


app.use('/', router);

taskCtrl(router);
userCtrl(router);
authCtrl(router,jwt,expressJwt);

app.listen(4000, () => console.log('Express server runing on 4000 port!'));