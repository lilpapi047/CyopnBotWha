const { prefix } = require("../config.json");

module.exports.run = async (message) => {
  const q = await message.getQuotedMessage();
  if (q !== undefined && q.type === "sticker") {
    try {
      const media = await q.downloadMedia();
      message.reply(media, undefined, { caption: `w` });
    } catch (e) {
      console.error(
        `Error en ${
          this.config.name
        } - Hora: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:\n`,
        e.toString()
      );
      message.reply(
        `Ocurrio un problema, si el problema persisite contacta a soporte`
      );
    }
  } else {
    message.reply(
      `Debes responder a un sticker con el comando *${prefix}${this.config.name}* o su alias *${prefix}${this.config.alias}*`
    );
  }
};

module.exports.config = {
  name: "toimg",
  alias: "ti",
  type: "misc",
  descripcion: "Responde a un sticker para extraer la imagen.",
};
