const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = ['main', 'pets']

module.exports = {
    mode: 'development',
    entry: pages.reduce((config, page) => {
        config[page] = `./shelter/pages/${page}/script.js`
        return config
    }, {}),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ],
    },
    plugins: [...pages.map(page => new HtmlWebpackPlugin({
        inject: true,
        template: `./shelter/pages/${page}/index.html`,
        filename: `${page}.html`,
    }))],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
}
