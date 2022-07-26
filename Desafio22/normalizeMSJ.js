const { schema, normalize, denormalize } = require('normalizr');
const util = require('util')

const chat = {
    id: 1,
    msjs: [
      {
        id: "1",
        msj: "buenas buenas",
        author: {
          id: "1",
          name: "jorge",
        },
      },
      {
        id: "2",
        msj: "buenas tardes",
        author: {
          id: "2",
          name: "alberto",
        },
      },
      {
        id: "3",
        msj: "a juanchi no le sale el desafio",
        author: {
          id: "6",
          name: "federica",
        },
      },
      {
        id: "4",
        msj: "alto nabo",
        author: {
          id: "2",
          name: "alberto",
        },
      },
    ],
};



const authorSchema = new schema.Entity("authors");
const msjsSchema = new schema.Entity("msjs", {
    author: authorSchema,
})
const chatSchema = new schema.Entity("chats", {
    msjs: [msjsSchema]
})


const normalizedChat = normalize(chat, chatSchema)

const pesoNormalized = util.inspect(normalizedChat).length;

console.log("-------------");


const denormalizedChat = denormalize(normalizedChat.result, chatSchema, normalizedChat.entities)

const pesoDenormalized = util.inspect(denormalizedChat).length;

const compresion = Math.trunc((pesoNormalized*100)/pesoDenormalized);

console.log(compresion);

module.exports = compresion;
module.exports = normalizedChat;