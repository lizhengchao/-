/**
 * Created by lzc on 2017/8/15.
 */

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
                    loaders: ['style-loader', 'css-loader']
                }
        ]

    },
    plugins: [
    ],
}