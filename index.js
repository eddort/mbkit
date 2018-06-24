const
    lex = require('pug-lexer'),
    parse = require('pug-parser'),
    wrap = require('./lib/runtime/wrap'),
    generateCode = require('./lib/code-gen');

module.exports = ({
    kitTagModels,
    template
}, opts) => {
    return wrap(generateCode(parse(lex(template)), {
        kitTagModels,
        ...opts
    }))
}