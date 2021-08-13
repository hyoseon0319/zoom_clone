import http from "http";
import SocketIO from "socket.io";
import express from "express";
//import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

io.on("connection", (socket) => {
    socket.on("enter_room", (a,b,c,d,e,f) => {
        console.log(a,b,c,d,e,f);
        // setTimeout(() => {
        //     done();
        // }, 10000);
    });
});

// 연결이 열렸습니다.
// 서버에 데이터 전송
// 연결된 브라우저

// ws
/* 
const wss = new WebSocket.Server({ httpServer });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    // 브라우저를 연결이 끊기면 서버 종료 event 발생
    socket.on("close", () => console.log("Disconnected from Browser Close ❌"));
        socket.on("message", (msg) => {
            const parsed = JSON.parse(msg);
            console.log(parsed);
            switch (parsed.type) {
                case "new_message":
                    // sockets.forEach( (aSocket) => aSocket.send(message.toString('utf-8')));
                    sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${parsed.payload}`));
                case "nickname":
                    socket["nickname"] = parsed.payload;
            }
        });
    }); */

    const handleListen = () => console.log(`Listening on http://localhost:3000`);
    httpServer.listen(3000, handleListen);
    