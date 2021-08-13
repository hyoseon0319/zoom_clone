// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload) {
//     const msg = { type, payload };
//     return JSON.stringify(msg);
// }

// // WebSocket 연결을 만듭니다.
// // 서버로의 연결
// socket.addEventListener("open", () => {
//     console.log("Connected to Server Open ✅");
// });

// //  서버로부터 메시지 수신
// socket.addEventListener("message", (message) => {
//     const li = document.createElement("li");
//     li.innerHTML = message.data;
//     messageList.append(li);
// });

// // 서버가 끊기면 브라우저에게 알림
// socket.addEventListener("close", () => {
//     console.log("Disconnected from Server Close ❌");
// });

// // setTimeout(() => {
// //   socket.send("hello from the browser!");
// // }, 10000);


// function handleNickSubmit(event) {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname", input.value));
//     input.value = "";
// }

// function handleMessageSubmit(event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     input.value = "";
// }

// nickForm.addEventListener("submit", handleNickSubmit);
// messageForm.addEventListener("submit", handleMessageSubmit);

const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit(
        "enter_room", 
        { payload: input.value }, 
        5,
        "hello",
        43443,
        true,
        false
        );
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);