const { InitArgError } =  require('./errors')

const testInpl = {
    image: {
        schema: {
            //ajv || joi
        },
        render() {
            //
        }
    }
}
const LOCAL_PATH = 'local.__m'
const PUB_ARG_METHOD = 'pug_arg'

class TagModel {
    constructor({
        name,
        schema,
        render,
        renderBefore = false,
        renderAfter = false
    }) {
        //нет schema = ошибка
        this.name = name
        this.schema = schema
        this._render = render
        this._renderBefore = renderBefore
        this._renderAfter = renderAfter
    }
    //эта функция будет на уровне препроцесинга
    //создавать массив аргументов и передавать его в карр. функцию рендер
    _addArgs(params) {
        //сопоставить схиму и аргументы
        //написать валидацию
        // '{'method('args'), method('args')...'}'
        return `{ ${params.map(p => `${PUB_ARG_METHOD}("${p.name}", ${p.val}),`)} }`
        // return `'block' + pug_attr("${params[0].name}", ${params[0].val}, true, false) `
    }
    //TODO
    _debug(args) {
        console.log(args)
    }
    _validateAndRun(args, runTo) {
        //todo validate
        console.log(args)
        return this[`_${runTo}`](args)
    }
    //вернуть строку вызова реального метода
    //с подставленной функцией парсинга аргументов
    render(params, isDebugMode, isAfter) {
        if (isDebugMode) {
            return `${LOCAL_PATH}._validateAndRun(${this._addArgs(params)}, 'debug')`
        }
        console.log(params, this)
        if (this._renderBefore === false && ! isAfter) {
            return `${LOCAL_PATH}._validateAndRun(${this._addArgs(params)}, 'render')`
        } else if (this._renderBefore && ! isAfter) {
            return `${LOCAL_PATH}._validateAndRun(${this._addArgs(params)}, 'renderBefore')`
        } else if (isAfter && this._renderAfter) {
            return `${LOCAL_PATH}._validateAndRun(${this._addArgs(params)}, 'renderAfter')`
        }
    }
    
    static wrap(models) {
        if (! Object.keys(models).length) {
            throw new InitArgError('models can not be empty')
        }
        const readyModels = {}
        for (let m in models) {
            if (!models[m].schema) {
                throw new InitArgError(`Not Found schema in ${m}`)
            }
            if (!models[m].render && !(models[m].renderBefore && models[m].renderAfter)) {
                throw new InitArgError(`Not Found avail render method combination in ${m}`)
            }
            readyModels[m] = new this({
                name: m,
                schema: models[m].schema,
                render: models[m].render,
                renderBefore: models[m].renderBefore,
                renderAfter: models[m].renderAfter
            })
        }
        return readyModels
    }
}

module.exports = TagModel