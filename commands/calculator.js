const { Calculator } = require('weky');

module.exports = {
    name: "calculator",
    aliases: ["calc"],
    run: async (client, message, args) => {
        await Calculator(message)
          }
};
