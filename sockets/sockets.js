let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    console.log("Connected");

    socket.on("ready", () => {
      console.log("Player ready", socket.id);
      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(reason);
    });
  });
}

module.exports = {
  listen,
};
