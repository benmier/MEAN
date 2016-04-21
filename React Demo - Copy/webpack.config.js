module.exports = {
  entry: './main.js',
  output: {
        filename: "bundle.js",
        path: __dirname + '/webpacked_code'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
}