const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
    modules: [path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules')]
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader', "css-modules-typescript-loader", { loader: "css-loader", options: { modules: { localIdentName: "[local]", exportLocalsConvention: "camelCase" } } }, "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              modules: true,
              name: "assets/Icon/[name].[ext]",
            },
          },
        ],
      },
    ],

  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      favicon: path.resolve(__dirname, "assets/images/favIcon.png")
    }),
  ],
};
