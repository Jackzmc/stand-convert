/* eslint-disable @typescript-eslint/no-var-requires */
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  publicPath: process.env.PUBLIC_PATH ?? '/'
}
