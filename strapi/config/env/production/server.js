module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://ip/s",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", ""),
    },
  },
});
