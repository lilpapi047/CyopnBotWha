const db = require('megadb')
const lvldB = new db.crearDB({
    nombre: 'dataLevel',
    carpeta: './database'
})

module.exports.run = async(client, message, args, config) => {
    const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
    let { body } = message
    const groupId = isGroupMsg ? chat.groupMetadata.id.replace('@g.us', '') : ''
    const sid = author.replace('@c.us', '')
    const { pushname } = sender
    try {
        if (lvldB.has(groupId) && lvldB.has(`${groupId}.${sid}`)) {
            const res = await lvldB.get(`${groupId}.${sid}`)
            if (res.xp === 0) {
                client.reply(from, `Aun no envias suficientes mensajes para tener un nivel o experiencia`, id)
            } else {
                client.reply(from, `Buen trabajo ${pushname}!
*Xp: ${res.xp}*
*Nivel: ${res.level}*`, id)
            }
        } else {
            lvldB.set(`${groupId}.${sid}`, {
                xp: 0,
                level: 1
            })
        }
    } catch (e) {
        console.error(e)
        client.reply(from, `Ocurrio un error`, id)
    }
}

module.exports.config = {
    name: "level",
    aliases: 'lvl',
    desc: 'Obten informacion sobre tu nivel y xp'
}