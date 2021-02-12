module.exports = {
  devServer: {
    proxy: {
      "": {
        target: "http://localhost:1337",
      },
    },
  },
};
