// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve as _resolve } from 'path';

interface WebpackOptions {
    mode?: string,
    port?: number
}

export default (options: WebpackOptions) => {

    return {
        mode: options.mode ?? 'development',
        entry: "./src/index.tsx",
        output: {
            path: _resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [new HtmlWebpackPlugin({
            template: './public/index.html'
        })],
        devServer: {
            port: options.port ?? 3000,
            open: true,
            historyApiFallback: true,
            hot: true
        }
    }
}