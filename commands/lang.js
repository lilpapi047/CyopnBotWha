module.exports.run = async (client, message, args, config) => {
	const { id, from } = message;
	try {
		await client.reply(
			from,
			`Lista de idiomas disponibles
    af: Afrikaans
    sq: Albanian
    ar: Arabic
    hy: Armenian
    ca: Catalan
    zh: Chinese
    zh-cn: Chinese (Mandarin/China)
    zh-tw: Chinese (Mandarin/Taiwan)
    zh-yue: Chinese (Cantonese)
    hr: Croatian
    cs: Czech
    da: Danish
    nl: Dutch
    en: English
    en-au: English (Australia)
    en-uk: English (United Kingdom)
    en-us: English (United States)
    eo: Esperanto
    fi: Finnish
    fr: French
    de: German
    el: Greek
    ht: Haitian Creole
    hi: Hindi
    hu: Hungarian
    is: Icelandic
    id: Indonesian
    it: Italian
    ja: Japanese
    ko: Korean
    la: Latin
    lv: Latvian
    mk: Macedonian
    no: Norwegian
    pl: Polish
    pt: Portuguese
    pt-br: Portuguese (Brazil)
    ro: Romanian
    ru: Russian
    sr: Serbian
    sk: Slovak
    es: Spanish
    es-es: Spanish (Spain)
    es-us: Spanish (United States)
    sw: Swahili
    sv: Swedish
    ta: Tamil
    th: Thai
    tr: Turkish
    vi: Vietnamese
    cy: Welsh`,
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
	name: "lang",
	alias: "la",
	desc: "Haz una busqueda en Google",
};
