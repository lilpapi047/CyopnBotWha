const { prefix } = require("../config.json");
const igdl = require("fg-ig");
const { MessageMedia } = require("whatsapp-web.js");

module.exports.run = async (message, args) => {
  const arg = args[1] === undefined ? args[0] : args[1];
  const url = arg[0];
  const idx = arg[1];
  let rs = [];
  if (!url) {
    message.reply(`Es necesario proporcionar un enlace
Usa *${prefix}${this.config.name} [enlace] [indice(opcional)]* o su alias *${prefix}${this.config.alias} [enlace] [indice(opcional)]*.`);
  } else {
    const isUrl = url.match(
      /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im
    );
    if (isUrl) {
      try {
        if (idx) {
          let res = await igdl(url);
          res.url_list.forEach((r) => {
            rs.push(r);
          });
          const media = new MessageMedia.fromUrl(rs[idx - 1], {
            unsafeMime: true,
          });
          message.reply(media, undefined, { caption: `w` });
        } else {
          let res = await igdl(url);
          let rs = [];
          res.url_list.forEach((r) => {
            rs.push(r);
          });
          for (const i in rs) {
            const media = await MessageMedia.fromUrl(rs[i], {
              unsafeMime: true,
            });
            message.reply(media, undefined, { caption: `w` });
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
    } else {
      message.reply(`El enlace no es valido.`);
    }
  }
};

module.exports.config = {
  name: "igdownload",
  alias: "igdl",
  type:"misc",
  descripcion: "Descarga multimedia de instagram.",
};
