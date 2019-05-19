const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const frontend = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    main: ['@babel/polyfill', path.join(__dirname, 'webui', 'index.js')],
  },

  output: { filename: '[name].js' },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './webui/index.html',
      filename: './index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', "@babel/react"],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, 'node_modules/material-components-web'),
          path.resolve(__dirname, 'node_modules/@material')
        ],
        use: ['style-loader', 'css-loader?modules=true']
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules/material-components-web'),
          path.resolve(__dirname, 'node_modules/@material')
        ],
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {
    host: '0.0.0.0', port: '3000',
    https: true,

    proxy: [{
      context: ['/api/v1/'],
      target: 'http://localhost:6400',
    }],

    compress: true,
    inline: true,
    overlay: {
      errors: true,
      warnings: true,
    },

    contentBase: path.join(__dirname, 'webui', 'static'),
  },
}

module.exports = [ frontend ]