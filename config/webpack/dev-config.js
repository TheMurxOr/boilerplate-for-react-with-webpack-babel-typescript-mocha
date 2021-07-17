// Dev configuration extends shared-config
const { resolve } = require("path");
const merge = require("webpack-merge");
const HtmlWebpackDeployAssetsPlugin = require('html-webpack-deploy-plugin')
const webpack = require("webpack");
const shared = require("./shared-config");
const sharedFKT = require('./getCDNPath.js')
const fs = require('fs')
const TerserPlugin = require("terser-webpack-plugin")

shared.plugins.push(new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
      VISUAL_DEBUG: true,
  }),
  new HtmlWebpackDeployAssetsPlugin({
    packages: {
      jquery: {
        scripts: {
          variableName: 'jQuery',
          useCdn: true,
          path: 'js',
          cdnPath: 'js',
        },
      },
      react: {
        scripts: {
          variableName: 'React',
          useCdn: true,
          path: 'react.development.js',
          cdnPath: 'umd/react.development.js',
        },
      },
      'react-dom': {
        scripts: {
          variableName: 'ReactDOM',
          useCdn: true,
          path: 'react-dom.development.js',
          cdnPath: 'umd/react-dom.development.js',
        },
      },
      'react-router-dom': {
        scripts: {
          variableName: 'ReactRouterDOM',
          useCdn: true,
          path: 'react-router-dom.js',
          cdnPath: 'umd/react-router-dom.js',
        },
      },
    },
    prependExternals: true,
    useCdn: true,
    getCdnPath: (packageName, packageVersion, packagePath) =>
      String(sharedFKT.getCdnPath(packageName, packageVersion, packagePath)),
  }),
)

module.exports = merge(shared, {
    mode: 'development',
    watch: false,
    watchOptions: {
      followSymlinks: false,
      ignored: '**/*',
    },
    entry: [
        resolve(process.cwd(), 'src/index.tsx'),// the entry point of our app
    ],
    devtool: 'eval-cheap-module-source-map',
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          },
        }),
      ],
    },
    devServer: {
        watchContentBase: false,
        contentBase: resolve(process.cwd(),"dist"),
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Referrer-Policy': 'no-referrer',
          // "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        port: 8080,
        https: true,
        key: fs.readFileSync(resolve(process.cwd(), 'certificates/dev.local.key')),
        cert: fs.readFileSync(resolve(process.cwd(), 'certificates/dev.local.crt')),
    
        //   publicPath: '/',
        overlay: true,
        hotOnly: true,
        historyApiFallback: true,
      },
    
   });