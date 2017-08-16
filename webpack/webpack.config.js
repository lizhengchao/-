/**
 * Created by lzc on 2017/8/15.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); /*将所有css提取到一个css中*/

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        // rules: [
        //     {
        //         test: /(\.jsx|\.js)$/,
        //         use:{
        //             loader: "babel-loader",
        //         },
        //         exclude: /node_modules/
        //     },
        //     {
        //         test: /\.css$/,
        //         use: [
        //             {
        //                 loader: 'style-loader'
        //             },{
        //                 loader: 'css-loader'
        //             }
        //         ]
        //     }
        // ]
            loaders: [
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader', 'postcss-loader']
                }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new ExtractTextPlugin("style.css")
    ],
}