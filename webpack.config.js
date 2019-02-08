const path = require('path');
const webpack = require('webpack');

module.exports = {
//    devtool: 'cheap-module-source-map',
    devtool: 'sourcemaps',
    entry: './src/main/js/index.js',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
/*    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        }),
    ],*/
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['env', 'react']
                }
            }
        ]
    }
};