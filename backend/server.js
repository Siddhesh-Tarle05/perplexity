import app from "./src/app.js";
import { ConnectToDB } from "./src/config/database.js";
import http from  'http'
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer=http.createServer(app)
initSocket(httpServer)
ConnectToDB()
httpServer.listen(3000,()=>{
    console.log('server running on port 3000')
})
