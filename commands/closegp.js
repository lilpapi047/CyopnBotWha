module.exports.run = async (client, message) => {
	const { id, from, author, isGroupMsg, chat } = message;
	const groupId = isGroupMsg ? chat.groupMetadata.id : "";
	let adm = await client.getGroupAdmins(groupId);
	let selfadm = await client.iAmAdmin();
	try {
		if (!isGroupMsg)
			return client.reply(
				from,
				"Comando solo disponible para grupos",
				id
			);
		if (selfadm.indexOf(groupId) == -1)
			return client.reply(
				from,
				"Para usar este comando debo ser administrador del grupo",
				id
			);
		if (adm.indexOf(author) == -1)
			return client.reply(
				from,
				"Para usar este comando debes ser administrador",
				id
			);
		await client.setGroupToAdminsOnly(groupId, true);
		await client.reply(
			from,
			`El grupo solo esta disponible para adminsitradores`,
			id
		);
	} catch (e) {
		console.error(
			`Error en ${this.config.name}
Hora: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:`,
			e.toString()
		);
		await client.reply(from, `Ocurrio un error`, id);
	}
	await client.simulateTyping(from, false);
};

module.exports.config = {
	name: "closegp",
	alias: "clp",
	desc: "Cierra el grupo",
};
