module.exports = {
  devServer: {
    proxy: {
      "/s/": {
        target: "http://localhost:1337",
        pathRewrite: { "^/s/": "" }
      },
      "/uploads": {
        target: "http://localhost:1337"
      }
    }
  }
};
