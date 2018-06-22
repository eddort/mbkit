const template = `
block(
        id='id-1-2-3'
        class='block-class'
    )
    image(
        src='/href'
    )
block(
        id='id-1-2-4'
    )
    gallery(
        images='2'
    )
    - var images = ['/src1', '/src2', '/src3']
    each srcc, i in images
        image(src=i)
`;

const parse = require('../index')

console.log(parse({
    template,
    kitTagModels: {
        //кжадая модель вернет функцию которая выполнится
        //в контексте шаблонизатора, таким образом подставит 
        //необходимые
        //node_modules/pug-runtime/index.js:function pug_attr(key, val, escaped, terse) {
            //переписать pug_attr
            //что бы возращал значение key:value а не key=value
        block: {
          render(params) {
            // console.log(params)
           
            // return ` pug_attr("srsc", i, true, false) `
            return `'block' + pug_attr("${params[0].name}", ${params[0].val}, true, false) `
          }
        },
        gallery: {
          render(params) {
            //   params.forEach(element => {
            //    console.log(element)
            // });
            return `'gallery' + pug_attr("${params[0].name}", ${params[0].val}, true, false) `
          }
        },
        image: {
          render(params) {
            // params.forEach(element => {
            //    console.log(element)
            // });
            // console.log(params[0],typeof params[0], params[0].name, '!!!!!!')
            return `'image' + pug_attr("${params[0].name}", ${params[0].val}, true, false) `
          }
        }
      }
}, {
    compileDebug: false,
    pretty: true,
    inlineRuntimeFunctions: true,
})())