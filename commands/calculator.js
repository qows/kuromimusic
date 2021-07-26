const { Calculator } = require('weky');

module.exports = {
    name: "calculator",
    aliases: ["calc"],
    run: async (client, message, args) => {
        await Calculator({
            message: message,
            embed: {
                title: 'Button Calculator',
                color: '#009BFF',
            },
            invalidQuery: 'The provided equation is invalid',
        });
    }
};
