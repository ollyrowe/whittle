const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "./tsconfig.json",
      },
    },
  ],
  webpack: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
};
