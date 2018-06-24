const
    lex = require('pug-lexer'),
    parse = require('pug-parser'),
    wrap = require('./lib/runtime/wrap'),
    generateCode = require('./lib/code-gen'),
    TagModel = require('./lib/tag-model')
//getTagMethods
//getLocalsMethods
module.exports = ({
    tagModels,
    template
}, opts) => {
    //TagModel.wrap(tagModels)
    return wrap(generateCode(parse(lex(template)), {
        tagModels,
        compileDebug: false,
        pretty: true,
        inlineRuntimeFunctions: true,
        ...opts
    }))
}