let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let conf = {
    entry: {
        index: path.resolve(__dirname, './src/pug/index/index.js'),
        blog: path.resolve(__dirname, './src/pug/blog/blog.js'),
        about: path.resolve(__dirname, './src/pug/about/about.js'),
        works: path.resolve(__dirname, './src/pug/works/works.js'),
        main: path.resolve(__dirname, './src/pug/main/main.js'),
        components: path.resolve(__dirname, './src/pug/components/components.js'),

    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js',
        publicPath: '/dist/'
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
          ],
        minimize: true,
        runtimeChunk: { name: 'common' },
        splitChunks: {
          cacheGroups: {
            default: false,
            commons: {
              test: /\.jsx?$/,
              chunks: 'all',
              minChunks: 2,
              name: 'common',
              enforce: true,
            },
            styles: {
                name: 'common',
                test: /\.css$/,
                chunks: 'all',
                minChunks: 2,
                enforce: true
              }
          },
        },
      },
    module:{
        rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader:'css-loader',
                    options: { sourceMap: true}
                },{
                    loader:'sass-loader',
                    options: { sourceMap: true}}]
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"]
        },
        { 
            test: /\.pug$/,
            use: "pug-loader",
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              { loader: 'file-loader',
                options: {
                  name: 'images/[name].[ext]',
                },},],
          },{
            test: /\.(ttf|eot|woff|woff2|otf)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          },
    ]
    },
    devServer: {
        overlay: true
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
          }),
        new MiniCssExtractPlugin({
          filename: "css/[name].css",
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/index/index.pug',
            filename: 'index.html',
            chunks: ['index', 'common']
          }),
        new HtmlWebpackPlugin({
            template: './src/pug/about/about.pug',
            filename: 'about.html',
            chunks: ['about', 'common']
          }),
        new HtmlWebpackPlugin({
            template: './src/pug/blog/blog.pug',
            filename: 'blog.html',
            chunks: ['blog', 'common']
          }),
        new HtmlWebpackPlugin({
            template: './src/pug/main/main.pug',
            filename: 'main.html',
            chunks: ['main', 'common']
          }),
        new HtmlWebpackPlugin({
            template: './src/pug/works/works.pug',
            filename: 'works.html',
            chunks: ['works', 'common']
          }),
          ],
};
module.exports = conf;