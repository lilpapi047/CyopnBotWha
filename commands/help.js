const { prefix } = require("../config.json");
const fs = require("fs");

module.exports.run = async (message) => {
  let txt = `*CyopnBot* 
*Prefijo*: [  ${prefix}  ] 
_yo_ : https://instagram.com/Cyopn_

*Informacion*
Escribe ${prefix} seguido de cualquiera de los comandos, recuerda que puedes usar el nombre del comando o su alias
_Uso: ${prefix}[Comando] [Texto/Enlace/Otros]_
Se deben sustituir los corchetes segun corresponda
_Ejemplo: ${prefix}attp Hola_
  
*Comandos*:`;
  let command = [];
  let alias = [];
  let type = [];
  let desc = [];
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    let jsfile = files.filter((f) => f.split(".").pop() === "js");
    if (jsfile.length <= 0) return console.log("No se encontro ningun comando");
    jsfile.forEach((f) => {
      let pull = require(`../commands/${f}`);
      command.push(pull.config.name);
      alias.push(pull.config.alias);
      type.push(pull.config.type);
      desc.push(pull.config.descripcion);
    });
    command.forEach((name) => {
      const sr = command.indexOf(name);
      if (type[sr] === "ign" || type[sr] === "adm") return;
      txt += `\n*${name}* (alias: ${alias[sr]})\n_${desc[sr]}_
`;
    });
    message.reply(txt);
  });
};

module.exports.config = {
  name: "help",
  alias: "h",
  type: "ign",
  descripcion: "Muestra este mensaje.",
};
