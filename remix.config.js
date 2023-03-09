const { config } = require("@netlify/remix-edge-adapter");

const devConfig = {
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*"],
};

const baseConfig = process.env.NODE_ENV === "production" ? config : devConfig;

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ...baseConfig,
  // This works out of the box with the Netlify adapter, but you can
  // add your own custom config here if you want to.
  //
  // See https://remix.run/docs/en/v1/file-conventions/remix-config
};
