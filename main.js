const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const handler = require("./handler");

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "nose",
  }),
  puppeteer: {
    executablePath: `D:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
  },
});

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("nose"));

app.listen(port, () => console.log(`App listener: http://localhost:${port}`));

client.on("qr", (qr) => {
  console.log(
    `Qr generado - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log(
    `Autenticado - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );
});

client.on("ready", () => {
  console.log(
    `Cliente listo - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );
});

client.on("message", (message) => {
  handler(message, client);
  const media = hasMedia
    ? message.downloadMedia()
    : message.getQuotedNessage().downloadMedia();
  message.reply(media, undefined, {
    sendMediaAsSticker: true,
    stickerAuthor: "ig: @Cyopn_",
    stickerName: "CyopnBot",
  });
});

client.initialize();
