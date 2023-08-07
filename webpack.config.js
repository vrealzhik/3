const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './js/menu.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"]},
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|ptf)$/i,
                type: "asset/resource",
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        // new CopyPlugin({
        //     patterns: [{ from: "img", to: "img"}],
        // }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    optimization: {
        minimizer: ["...", new CssMinimizerPlugin()],
    },
}