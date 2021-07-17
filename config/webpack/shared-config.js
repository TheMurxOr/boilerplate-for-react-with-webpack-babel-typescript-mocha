// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports.ProjectOutputFolder = 'dist/'
console.log('Project Output path: ', this.ProjectOutputFolder)

module.exports.ProjectPublicFolder = 'public/'
console.log('Project public folder: ', this.ProjectPublicFolder)

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    context: resolve(process.cwd(), 'src'),
    output: {
        filename: 'js/index.bundle.js',
        path: resolve(process.cwd(), this.ProjectOutputFolder),
       
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        template: resolve(
            process.cwd(),
            this.ProjectPublicFolder,
            'index.html.ejs',
        ),
        }),
        // new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
        patterns: [
            {
            from: resolve(this.ProjectPublicFolder,`**/*`),
            to: `images/[name][ext]",`, // "[path][name].[contenthash][ext]",
            globOptions: { ignore: ['**/*.ejs'] },
            },
        ],
        }),
    ],
    externals: {
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDom',
    },
    performance: {
        // false | "warning" | "error"
        hints: "warning",
    },
    module: {
        rules: [
            { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /.s?css$/,
                use: [
                'style-loader',
                // MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                ],
            },
        ],
    },
};