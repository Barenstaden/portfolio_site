module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        host: env("DATABASE_HOST", "localhost"),
        srv: env.bool("DATABASE_SRV", false),
        port: env.int("DATABASE_PORT", 27017),
        database: env("DATABASE_NAME", "portfolio"),
        username: env("DATABASE_USERNAME", "Thomas"),
        password: env("DATABASE_PASSWORD", "InnTilPor1"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", "admin"),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});
