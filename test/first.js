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
        images=''
    )
    - var images = ['/src1', '/src2', '/src3']
    each src in images
        image(
            src=src
        )
`;

const parse = require('../index')

console.log(parse({
    template,
    kitTagModels: {
        block: {
          render(params) {
            // console.log(params)
            return `block, method ${params}`
          }
        },
        gallery: {
          render(params) {
            return `gallery, method ${params}`
          }
        },
        image: {
          render(params) {
            return `image, method ${params}`
          }
        }
      }
}, {
    compileDebug: false,
    pretty: true,
    inlineRuntimeFunctions: true,
})())