require('dotenv').config();
const http=require('http');
const app =require('./index');
const server =http.createServer(app);
server.listen(process.env.PORT);
//server creating code written by najam
// server creating anf connection with nodemon ok