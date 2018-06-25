const template = `
block(
        id='id-1-2-3'
        class='block-class'
        hz={"aa": 22}
    )
    image(
        src='/href'
    ) AAAAAAAAA
block(
        id='id-1-2-4'
    )
    gallery(
        images='2'
    )
    - var images = ['/src1', '/src2', '/src3']
    each srcc, i in images
        image(src=i test=images) ssssss
`;
global.tests = console.log
const parse = require('../index')

console.log(parse({
    template,
    tagModels: {
        //кжадая модель вернет функцию которая выполнится
        //в контексте шаблонизатора, таким образом подставит 
        //необходимые
        //node_modules/pug-runtime/index.js:function pug_attr(key, val, escaped, terse) {
            //переписать pug_attr
            //что бы возращал значение key:value а не key=value
        block: {
          schema: {
              id: String,
              class: String
          },
          render(params) {
            //   console.log(params.hz, '!!!')
            // console.log(params)
           
            // return ` pug_attr("srsc", i, true, false) `
            return 'block'
          }
        },
        gallery: {
            schema: {},
          render(params) {
            //   params.forEach(element => {
            //    console.log(element)
            // });
            return 'gallery'
          }
        },
        image: {
            schema: {},
          render(params, text) {
              console.log(text, '!!!')
            // params.forEach(element => {
            //    console.log(element)
            // });
            // console.log(params[0],typeof params[0], params[0].name, '!!!!!!')
            return 'image'
          }
        }
      }
}, {
}))