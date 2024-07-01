let express = require("express");
let app = express();
let cors = require("cors");
let {Server}= require("socket.io");
let http_server = require("http").createServer(app);
const io = new Server(http_server,{cors:{origin:"*"}});
app.use(cors());


io.on("connection",(socket)=>{
  console.log("a user connected!!")
});

app.get('/',(req,res)=>{
  res.send("api is working!!")
});



http_server.listen(8080,()=>console.log("the server is listening at port 8080"));
