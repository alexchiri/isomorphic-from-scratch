var webpack = require("webpack");
var path = require("path");

module.exports = {
    target: "web",
    cache: false,
    context: __dirname,
    devtool: false,
    entry: ["./src/client"],
    output: {
        path: path.join(__dirname, "static/dist"),
        filename: "client.js",
        chunkFilename: "[name].[id].js",
        publicPath: "dist/"
    },
    plugins: [
        new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.json$/, loaders: ["json"]},
            {
                test: /\.jsx?$/,
                loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0"],
                exclude: /node_modules/
            }
        ],
        noParse: /\.min\.js/
    },
    resolve: {
        modules: [
            "src",
            "node_modules",
            "web_modules"
        ],
        extensions: [".json", ".js", ".jsx"]
    },
    node: {
        __dirname: true,
        fs: 'empty'
    }
};
