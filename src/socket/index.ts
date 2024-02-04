import { classServer } from "./server";
import { Server } from "socket.io";
const io = new Server();
const arrServers:Array<classServer> = [];
let num = 0;

io.on("connection", (socket) => {
  socket.on("c_vyhledatServers",()=>{
    return socket.emit("s_servers",arrServers)
  })
  socket.on("c_pripojitServer",(info)=>{
    socket.join(`room${info.number}`);
    const nms = arrServers.find(x => x.number === info.number);
    if(typeof nms === "undefined") return console.log("problem");
    nms.addPerson(info.name);
    return io.to(`room${info.number}`).emit("s_joined",{server:nms,addedName:info.name});
  })
  socket.on("c_vytvorServer",(data)=>{
    num+=1;
    const server = new classServer(data);
    server.addPerson(data.hosted);
    arrServers.push(server);
    socket.join(`room${num}`);
    return socket.emit("s_vytvorServer",{data:data,funguje:true});
  })
  socket.on("c_start",(number)=>{
    return io.to(`room${number}`).emit("s_start",{status:true,url:"://"});
  })
  socket.on("disconnecting",async()=>{
    return console.log(`Odpojil se. Nyní počet klientů: ${io.engine.clientsCount}`);
  })
});