var path = require('path');

module.exports = {
  entry: './src/main',
  output: 'bundle.js',
  module: {
    loaders: [
      //{ test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};
