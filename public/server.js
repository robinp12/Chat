const io = require("socket.io")();
const server = io.listen(process.env.PORT || 3002);
// event fired every time a new client connects:
var users = [];
var msg = [];

server.on("connection", (socket) => {
  console.info(`Client connecté [id=${socket.id}]`);

  socket.on("login", (name) => {
  console.info(`${name} est connecté.e`);

    //Ajouter les utilisateurs connectés a la liste sauf l'admin
      users.push(name);
      server.emit("oldmsg",msg)

    //Envoyer la liste
    server.emit("users", users);

    //Envoi de message
    socket.on("send", ({ from, desc, to }) => {
      msg.push({from, desc,to });

      console.log(from +" a envoyé \"" + desc + "\"");
        server.emit("send", {from, desc,to });
      });
      //Supprimer tous les messages en cliquant
      socket.on("del", e => {
        if(e==1){msg = []} 
        server.emit("del", msg);
      })

    //Deconnexion
    socket.on("disconnect", () => {
      //Supprimer l'utilisateur de la liste quand il se deconnecte
      users.splice(users.indexOf(name), 1);
      console.info(`${name} est déconnecté.e`);
      //Envoyer la nouvelle liste des utilisateurs connecté
      server.emit("users", users);
    });
  });
});