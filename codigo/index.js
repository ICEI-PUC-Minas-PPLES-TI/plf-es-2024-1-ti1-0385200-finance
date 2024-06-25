const jsonServer = require('json-server')
const server = jsonServer.create()

const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'db/db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const cors = require('cors');

const express=require('express');

const app=express();

// Servidor abrindo as outras pastas
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/db', express.static(path.join(__dirname, 'db')));
app.use('/', express.static(path.join(__dirname, '')));
app.use(cors());

app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'','index.html'));
});

app.listen(8080, () => {
  console.log("Starting at", 8080);
});


server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})