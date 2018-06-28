const { InitArgError } = require("./errors");
const Ajv = require("ajv");

const LOCAL_PATH = "locals.__m";
const PUB_ARG_METHOD = "pug_attr";

const baseSchema = {
	_texts: { type: "string" }
};

class TagModel {
	constructor({
		name,
		schema,
		render,
		renderBefore = false,
		renderAfter = false
	}) {
		this.name = name;
		this.schema = schema;
		this._render = render;
		this._renderBefore = renderBefore;
		this._renderAfter = renderAfter;
		this._schemaName = `schema_${this.name}`;
		this.nodes = []
		const ajv = new Ajv();
		this.validate = ajv.compile({
			...this.schema,
			properties: { ...baseSchema, ...this.schema.properties }
		});
	}
	//эта функция будет на уровне препроцесинга
	//создавать массив аргументов и передавать его в карр. функцию рендер
	_addArgs(params) {
		let funcStr = `${params.map(p => `${PUB_ARG_METHOD}("${p.name}", ${p.val})`)}`;
		if (! funcStr.length) {
			return "{}"
		}
		return funcStr;
	}
	//TODO
	_debug(args) {
		console.log(args);
	}
	_validateAndRun(runTo, texts, ...args) {
		const _args = {
			...TagModel._prepareArgs(args),
			_texts: texts,
			_nodes: this.nodes.pop()
		};
		let err;
		if (!this.validate(_args)) {
			err = this.validate.errors;
		}
		return this[`_${runTo}`](err, _args);
	}
	//вернуть строку вызова реального метода
	//с подставленной функцией парсинга аргументов
	render(params, texts, isAfter, nodes) {
		if (isAfter && !this._renderAfter) {
			return "";
		}
		console.log(texts, '!!!')
		this.nodes.push(nodes)
		// if (isDebugMode) {
		// 	return `${LOCAL_PATH}.${
		// 		this.name
		// 	}._validateAndRun('debug', ${texts}, ${this._addArgs(params)})`;
		// }
		if (this._renderBefore === false || isAfter === null) {
			return `${LOCAL_PATH}.${
				this.name
			}._validateAndRun('render', ${texts}, ${this._addArgs(params)})`;
		} else if (this._renderBefore && isAfter === false) {
			return `${LOCAL_PATH}.${
				this.name
			}._validateAndRun('renderBefore', ${texts}, ${this._addArgs(
				params
			)})`;
		} else if (isAfter === true && this._renderAfter) {
			return `${LOCAL_PATH}.${
				this.name
			}._validateAndRun('renderAfter', ${texts}, ${this._addArgs(
				params
			)})`;
		}
	}

	static _prepareArgs(rawArgs) {
		return rawArgs.reduce((acc, raw) => {
			let arg;
			try {
				arg = JSON.parse(raw);
			} catch (e) {
				return acc
			}
			let key = Object.keys(arg)[0];
			try {
				acc[key] = JSON.parse(arg[key]);
			} catch (e) {
				acc[key] = arg[key];
			}
			return acc;
		}, {});
	}

	static wrap(models) {
		if (!Object.keys(models).length) {
			throw new InitArgError("models can not be empty");
		}
		const readyModels = {};
		for (let m in models) {
			if (!models[m].schema) {
				throw new InitArgError(`Not Found schema in ${m}`);
			}
			if (
				!models[m].render &&
				!(models[m].renderBefore && models[m].renderAfter)
			) {
				throw new InitArgError(
					`Not Found avail render method combination in ${m}`
				);
			}
			readyModels[m] = new this({
				name: m,
				schema: models[m].schema,
				render: models[m].render,
				renderBefore: models[m].renderBefore,
				renderAfter: models[m].renderAfter
			});
		}
		return readyModels;
	}
}

module.exports = TagModel;
