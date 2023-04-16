const { prefix, zenKey } = require("../config.json");
const axios = require("axios").default;
const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");

module.exports.run = async (message, args) => {
	const arg = args[1] === undefined ? args[0].join("") : args[1].join("");
	if (!arg) {
		message.reply(`Es necesario proporcionar un enlace
Usa *${prefix}${this.config.name} [enlace]* o su alias *${prefix}${this.config.alias} [enlace]*.`);
	} else {
		try {
			const response = await axios.get(
				`https://api.zahwazein.xyz/downloader/musically?apikey=${zenKey}&url=${arg}`
			);
			if (response.status === 200 && response.data.status === "OK") {
				const media = await MessageMedia.fromUrl(
					response.data.result.url_hd,
					{
						unsafeMime: true,
						filename: "r.mp4",
					}
				);
				message
					.reply(media, undefined, {
						caption: `w`,
						sendMediaAsDocument: true,
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				message.reply(
					`No se pudo establecer conexion con el servidor, intenta mas tarde.`
				);
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
	}
};

module.exports.config = {
	name: "tiktok",
	alias: "tk",
	type: "misc",
	descripcion: "Descarga tiktok's sin marca de agua",
};
