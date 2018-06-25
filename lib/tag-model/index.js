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
const LOCAL_PATH = 'locals.__m'
const PUB_ARG_METHOD = 'pug_attr'

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
       return `${params.map(p => `${PUB_ARG_METHOD}("${p.name}", ${p.val})`)}`
    }
    //TODO
    _debug(args) {
        console.log(args)
    }
    _validateAndRun(runTo, texts, ...args) {
        //todo validate
        return this[`_${runTo}`](TagModel._prepareArgs(args), texts)
    }
    //вернуть строку вызова реального метода
    //с подставленной функцией парсинга аргументов
    render(params, texts, isDebugMode, isAfter) {
        if (isDebugMode) {
            return `${LOCAL_PATH}.${this.name}._validateAndRun('debug', ${texts}, ${this._addArgs(params)})`
        }
        if (this._renderBefore === false && ! isAfter) {
            return `${LOCAL_PATH}.${this.name}._validateAndRun('render', ${texts}, ${this._addArgs(params)})`
        } else if (this._renderBefore && ! isAfter) {
            return `${LOCAL_PATH}.${this.name}._validateAndRun('renderBefore', ${texts}, ${this._addArgs(params)})`
        } else if (isAfter && this._renderAfter) {
            return `${LOCAL_PATH}.${this.name}._validateAndRun('renderAfter', ${texts}, ${this._addArgs(params)})`
        }
    }
    
    static _prepareArgs(rawArgs) {
        return rawArgs.reduce((acc, raw) => {
            let arg = JSON.parse(raw)
            let key = Object.keys(arg)[0]
            try {
                acc[key] = JSON.parse(arg[key])
            } catch (e) {
                acc[key] = arg[key]
            }
            return acc
        }, {})
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