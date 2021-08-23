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
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anon"
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
  });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName); // room에 접속한다.
        done(); // 서버에서 실행
        socket.to(roomName).emit("welcome", socket.nickname);
        // event를 방금 참가한 방안에 있는 모든 사람에게 emit
        // 프론트엔드에서 event에 반응하도록 만들어야 함
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => 
            socket.to(room).emit("bye", socket.nickname)
        );   
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
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
    