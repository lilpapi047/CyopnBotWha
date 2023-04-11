const { prefix } = require("../config.json");

module.exports.run = async (message) => {
  const { hasMedia } = message;
  const q = await message.getQuotedMessage();
  if (hasMedia || (q !== undefined && q.hasMedia && q.type !== "sticker")) {
    const msg = hasMedia ? message : q;
    try {
      const media = await msg.downloadMedia();
      message.reply(media, undefined, {
        sendMediaAsSticker: true,
        stickerAuthor: "ig: @Cyopn_",
        stickerName: "CyopnBot",
      });
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
  } else {
    message.reply(
      `Debes enviar o responder a una imagen/video/gif con el comando *${prefix}${this.config.name}* o su alias *${prefix}${this.config.alias}*.`
    );
  }
};

module.exports.config = {
  name: "sticker",
  alias: "s",
  type: "misc",
  descripcion:
    "Crea stickers enviando o respondiendo a una imagen/video/gif, los videos seran recortados automaticamente.",
};
