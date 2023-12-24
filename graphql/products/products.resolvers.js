const { products } = require("./products.model");

module.exports = {
  Query: {
    products: () => {
      return products;
    },
    product: (_, { id }) => {
      return products.find((product) => product.id == id);
    },
  },
};
