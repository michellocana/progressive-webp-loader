const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'entry.js'),
  output: {
    path: path.resolve(__dirname, 'output')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.jpg/,
        use: {
          loader: path.resolve(__dirname, '../loader.js'),
          options: {
            name: '[path][name].[ext]?v=[contenthash]',
            context: __dirname
          }
        }
      }
    ]
  }
}
