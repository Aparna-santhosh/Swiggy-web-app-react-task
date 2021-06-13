const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    warnings: false,
                    mangle: true,
                    ie8: false
                }
            }),
            new CssMinimizerPlugin(),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
});
