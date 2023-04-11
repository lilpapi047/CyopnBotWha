const fs = require("fs");
let command = [];
let alias = [];
const config = require("./config.json");

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) return console.log("No se encontro ningun comando");
  jsfile.forEach((f) => {
    let pull = require(`./commands/${f}`);
    command.push(pull.config.name);
    alias.push(pull.config.alias);
  });
});

/**
 *
 * @param {Object} message Mensaje recibido
 * @param {Object} client Cliente (bot)
 */
module.exports = async (message, client) => {
  client.sendSeen(message.id);
  const { hasQuotedMsg, body } = message;
  let q;
  if (hasQuotedMsg) {
    const qtmp = await message.getQuotedMessage();
    q = qtmp.body.trim().split(" ");
  } else {
    q = undefined;
  }
  try {
    if (body.startsWith(config.prefix)) {
      const arg = body.slice(config.prefix.length).trim().split(" ");
      const comm = arg.shift().toLowerCase();
      const args = [arg, q];
      const sr =
        command.indexOf(comm) === -1
          ? alias.indexOf(comm)
          : command.indexOf(comm);
      if (sr === -1) {
        return;
      } else {
        const commFil = command[sr];
        const commFile = require(`./commands/${commFil}`);
        commFile.run(message, args);
      }
    }
  } catch (e) {
    console.error(
      `Error en ${
        this.config.name
      } - Hora: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:\n`,
      e.toString()
    );
    message.reply(
      `Ocurrio un problema, si el problema persisite contacta a soporte.`
    );
  }
};
