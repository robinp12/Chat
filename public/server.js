const PORT = 3002;
const INDEX = '/index.html';
const express = require("express");
const socketIO = require("socket.io");

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

// const io = require("socket.io")();
// const server = io.listen(process.env.PORT || 443);
// event fired every time a new client connects:
var users = [];
var msg = [];

io.on("connection", (socket) => {
  console.info(`Client connecté [id=${socket.id}]`);
  setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

  socket.on("login", (name) => {
  console.info(`${name} est connecté.e`);

    //Ajouter les utilisateurs connectés a la liste sauf l'admin
      users.push(name);
      io.emit("oldmsg",msg)

    //Envoyer la liste
    io.emit("users", users);

    //Envoi de message
    socket.on("send", ({ from, desc, to }) => {
      msg.push({from, desc,to });

      console.log(from +" a envoyé \"" + desc + "\"");
        io.emit("send", {from, desc,to });
      });
      //Supprimer tous les messages en cliquant
      socket.on("del", e => {
        if(e===1){msg = []} 
        io.emit("del", msg);
      })

    //Deconnexion
    socket.on("disconnect", () => {
      //Supprimer l'utilisateur de la liste quand il se deconnecte
      users.splice(users.indexOf(name), 1);
      console.info(`${name} est déconnecté.e`);
      //Envoyer la nouvelle liste des utilisateurs connecté
      io.emit("users", users);
    });
  });
});