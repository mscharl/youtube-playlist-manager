const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry      : ['./src/js/main.js', './src/scss/main.scss'],
    output     : {
        path      : path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename  : 'build.js',
    },
    module     : {
        rules: [
            {
                test: /\.css$/,
                use : ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use     : [
                        {
                            loader : 'css-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader : 'postcss-loader',
                            options: { sourceMap: true },
                        },
                    ],
                }),
            }, {
                test: /\.scss$/,
                use : ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use     : [
                        {
                            loader : 'css-loader',
                            options: { sourceMap: true },
                        }, {
                            loader : 'postcss-loader',
                            options: { sourceMap: true },
                        }, {
                            loader : 'sass-loader',
                            options: { sourceMap: true },
                        },
                    ],
                }),
            }, {
                test  : /\.vue$/,
                loader: 'vue-loader',
            }, {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
            }, {
                test   : /\.(png|jpg|gif|svg)$/,
                loader : 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                },
            },
        ],
    },
    resolve    : {
        alias     : {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    devServer  : {
        historyApiFallback: true,
        noInfo            : true,
        overlay           : true,
    },
    performance: {
        hints: false,
    },
    devtool    : '#eval-source-map',
    plugins    : [
        new ExtractTextPlugin('styles.css'),
    ],
};

if(process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }), new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress : {
                warnings: false,
            },
        }), new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ])
}
