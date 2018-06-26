const template = `
block(
        id='id-1-2-3'
        class='block-class'
        hz={"aa": 22}
    )
    image(
        src='/href'
    ) AAAAAAAAA
block(id='id-1-2-4')
    BEFORE
        gallery(
            images='2'
        )
    AFTER
    - var images = ['/src1', '/src2', '/src3']
    each srcc, i in images
        image(src=i test=images) ssssss
`;

const parse = require('../index')

console.log(parse({
    template,
    tagModels: {
        block: {
          schema: {
              id: String,
              class: String
          },
          render(params, texts) {
            return `block: ${params.id}, ${texts}`
          }
        },
        gallery: {
            schema: {},
          render(params, texts) {
            return `gallery: ${params}, ${texts}`
          }
        },
        image: {
            schema: {},
          render(params, texts) {
            return `image: ${params}, ${texts}`
          }
        }
      }
}, {
}))