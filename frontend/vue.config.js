module.exports = {
  // Configuring our API Backend through webpack
  // https://cli.vuejs.org/config/#devserver
  // https://dennisreimann.de/articles/vue-cli-serve-express.html
  devServer: {
    // before: configureAPI
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:4040/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};