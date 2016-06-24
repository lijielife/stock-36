const path = require("path")
const webpack = require("webpack")

module.exports = {
    entry: [
        "./js"
    ],
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel?presets[]=es2015,presets[]=react"]       
            },
            { 
                test: /\.css$/,
                loader: "style-loader!css-loader" 
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            __HOST__: JSON.stringify("localhost:8000")
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}