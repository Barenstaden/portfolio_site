module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "sqlite",
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
