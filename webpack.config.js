var path = require("path");
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    devtool: 'cheap-source-map', // the best source map for dev. may want to change for production, or remove
    entry: {
        global: "./src" // our global entry point. Feel free to add more here.
    },
    output: {
        path: path.join(__dirname, "dist"), // output into /dist
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    node: {
        Buffer: false // this helps with stylelint
    },
    module: { // set loaders for different file types
        rules: [
            {   // js uses babel and eslint
                test: /\.js/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {   // compile scss with css loader, postcss loader, and sass loader
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            },
            {   // compile css in the same way, without the sass loader
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        { loader: 'postcss-loader' }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"), // extract css into a separate file
        new CommonsChunkPlugin({ // pull out common chunks into separate bundles
            filename: "common.js",
            name: "global"
        }),
        new StyleLintPlugin({ // stylelint configuration
            context: "./src",
            configFile: '.stylelintrc',
            files: '**/*.scss',
            failOnError: false,
            quiet: false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [ // postcss plugins
                    require("postcss-cssnext"),
                    require("postcss-reporter")({ clearMessages: true })
                ]
            }
        })
    ],
    resolve: {
        modules: [ path.join(__dirname, './src'), path.join(__dirname, './node_modules') ],
        extensions: ['.js', '.scss', '.css']
    }
}
