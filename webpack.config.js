const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/script.js', // Your main JS file
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development', // or 'production'
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // we'll move your HTML here
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // For importing CSS in JS
      },
    ],
  },
};
