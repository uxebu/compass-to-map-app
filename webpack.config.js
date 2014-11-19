module.exports = {
  entry: './src/main',
  output: 'bundle.js',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'es6-loader'}
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};
