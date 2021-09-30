const fs = require('fs')
const db = require('megadb')
let dBase = new db.crearDB({
    nombre: 'dataDesc',
    carpeta: './configdata'
})

module.exports.run = async(client, message, args, config) => {
    const { id, from, sender, isGroupMsg, chat } = message
    const groupId = isGroupMsg ? chat.groupMetadata.id.replace('@g.us', '') : ''
    const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
    const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false

    try {
        if (!isGroupMsg) return client.reply(from, 'Comando solo disponible en grupos', id)
        if (!isGroupAdmins) return client.reply(from, 'Necesitas ser administrador para usar este comando', id)
        const opt = args.join('')
        if (!dBase.has(groupId)) {
            dBase.set(groupId, {
                welcome: 'No',
                nsfw: 'No'
            })
        }
        switch (opt) {
            case 'welcome':
                const res = await dBase.get(groupId)
                if (res.welcome === 'No') {
                    client.reply(from, 'La bienvenida esta desactivada', id)
                } else {
                    let ns = res.nsfw === 'No' ? 'No' : 'Si'
                    dBase.set(groupId, {
                        welcome: 'No',
                        nsfw: ns
                    })
                    client.reply(from, 'Se desactivo con exito la bienvenida', id)
                }
                break

            case 'nsfw':
                const resn = await dBase.get(groupId)
                if (resn.nsfw === 'No') {
                    client.reply(from, 'El nsfw esta desactivado', id)
                } else {
                    let wel = resn.welcome === 'No' ? 'No' : 'Si'
                    dBase.set(groupId, {
                        welcome: wel,
                        nsfw: 'No'
                    })
                    client.reply(from, 'Se desactivo con exito el nsfw', id)
                }
                break
            default:

                break
        }
    } catch (e) {
        console.error(e)
        client.reply(from, `Ocurrio un error`, id)
    }
}

module.exports.config = {
    name: "deact",
    aliases: 'dc',
    desc: 'Desactiva algunas funciones(bienvebida/nsfw)'
}