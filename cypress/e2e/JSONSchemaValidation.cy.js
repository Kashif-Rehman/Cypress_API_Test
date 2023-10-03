const Ajv = require("ajv");
const ajv = new Ajv();

describe("Schema Validation", () => {
  it("Schema Validation Against Response", () => {
    cy.request({
      method: "GET",

      url: "http://fakestoreapi.com/products",
    }).then((res) => {
      const schema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Generated schema for Root",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
            },
            title: {
              type: "string",
            },
            price: {
              type: "number",
            },
            description: {
              type: "string",
            },
            category: {
              type: "string",
            },
            image: {
              type: "string",
            },
            rating: {
              type: "object",
              properties: {
                rate: {
                  type: "number",
                },
                count: {
                  type: "number",
                },
              },
              required: ["rate", "count"],
            },
          },
          required: [
            "id",
            "title",
            "price",
            "description",
            "category",
            "image",
            "rating",
          ],
        },
      };

      const validator = ajv.compile(schema);
      const isValid = validator(res.body);
      expect(isValid).to.be.true;
    });
  });
});
