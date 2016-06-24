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
                loaders: ["react-hot", "babel?presets[]=es2015,presets[]=react"]       
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
            __HOST__: JSON.stringify("localhost:8000")
        })
    ]
}