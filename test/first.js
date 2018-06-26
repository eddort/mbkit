const template = `
block(
        id='id-1-2-3'
        class='block-class'
        hz={"aa": 22}
    )
    image(
        src='/href'
    ) AAAAAAAAA
block(id='id-1-2-4' class='block-class')
    BEFORE
        gallery(
            images='2'
        )
    AFTER
    - var images = ['/src1', '/src2', '/src3']
    each srcc, i in images
        image(src=i test=images) ssssss
`;

const parse = require("../index");

console.log(
	parse(
		{
			template,
			tagModels: {
				block: {
					schema: {
						type: "object",
						properties: {
							class: {
								type: "number"
							},
							hz: {
								type: "object"
							}
						}
					},
					render(err, attrs) {
						console.log(err, "!!!");
						return `block: ${attrs}`;
					}
				},
				gallery: {
					schema: {},
					render(err, attrs) {
						return `gallery: ${attrs}`;
					}
				},
				image: {
					schema: {},
					render(err, attrs) {
						return `image: ${attrs}`;
					}
				}
			}
		}
	)
);
