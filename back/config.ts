import path from "path";
const rootPath = __dirname;

const config = {
  rootPath,

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  db: "mongodb://localhost/playlist",
  publicPath: path.join(rootPath, "public"),
};

export default config;
