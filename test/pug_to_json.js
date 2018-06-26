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
	div
	div
`
//TODO indent errors
// (
// (
//   )(
//   )
// )
//TODO ошибка если не attr
//TODO parent и childs
console.log(
	parse(
		{
			template,
			tagModels: tags.reduce((acc, tag) => {
				acc[tag] = {
					schema: {},
					// render(err, attr) {
					// 	return `${tag}: ___`
					// }
					renderBefore(err, attr) {
						return `{test:111, aaa:`
					},
					renderAfter(err, attr) {
						return '},'
					}
				}
				return acc
			}, {})
		}
	)
);