module.exports = {
  devServer: {
    proxy: {
      "/s/": {
        target: "http://localhost:1337",
        pathRewrite: { "^/s/": "" }
      },
      "/graphql": {
        target: "http://localhost:1337"
      },
      "/uploads": {
        target: "http://localhost:1337"
      }
    }
  }
};
