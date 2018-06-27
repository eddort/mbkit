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
	"html",
	"p",
	"while"
];

//todo нужно парсить текст контент иначе
// | Hey, check out 
// a(href="http://example.biz/kitteh.png") this picture
// |  of my cat!
const template = `
html(lang='en')  
	head
		title Pug
	body
		h1 Pug Examples
		div.container
		p(aa=123) Cool Pug example!
		- var n = 0;
		ul
			each n in [1,2,3,4]
				li(ss=n) sssss #{n}
`;
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