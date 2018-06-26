const parse = require("../index");
const range = n => [...Array(n).keys()];
const tags = [
	"div",
	...range(7).map(i => `h${i + 1}`),
	"span",
	"li",
	"ul",
	"table",
	"footer",
	"header",
	"head",
	"body",
	"html"
];


const template = `
body
  div hello
  div.test(a='aa') world
`
//TODO parent
console.log(
	parse(
		{
			template,
			tagModels: tags.reduce((acc, tag) => {
				acc[tag] = {
					schema: {
						
					},
					// render(err, attr) {
					// 	return `${tag}: ___`
					// }
					renderBefore(err, attr) {
						return `{\f`
					},
					render(err, attr) {
						// console.log(err, Object.keys(attr).length, attr)
						// if (err) {
						// 	return JSON.stringify(attr)
						// }
						console.log(JSON.stringify({...attr, _nodes: null}))
						return 'asdsadasd:asdsad'
					},
					renderAfter(err, attr) {
						return '},\n'
					}
				}
				return acc
			}, {})
		}
	)
);