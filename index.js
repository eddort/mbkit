const
    lex = require('pug-lexer'),
    parse = require('pug-parser'),
    wrap = require('pug-runtime/wrap'),
    generateCode = require('./lib/codeGen');

module.exports = ({
    kitTagModels,
    template
}, opts) => {
    return wrap(generateCode(parse(lex(template)), {
        kitTagModels,
        ...opts
    }))
}