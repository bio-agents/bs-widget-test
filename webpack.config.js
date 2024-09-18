const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: path.resolve(__dirname, './src', 'main'),

    // devagent: 'source-map',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'widget-demo.js',
        sourceMapFilename: 'widget-demo.js.map',
        publicPath: '/dist/',
    },

    plugins: [
        /*
        TODO update this to support webpack v3!!
        
        new webpack.ProvidePlugin({
            'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),

        new HtmlWebpackPlugin({
            template: path.resolve('index.html')
        }) */
    ],

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    /*
    devServer: {
        historyApiFallback: true,
        noInfo: true
    }, */

    performance: {
        hints: false
    },

    devagent: '#eval-source-map'


};
