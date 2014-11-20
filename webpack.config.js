module.exports = {
  entry: './src/main',
  output: 'bundle.js',
  module: {
    loaders: [
      // Transpile any JavaScript file:
      {
        test: /\.js$/,
        loader: 'webpack-traceur?runtime',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};
