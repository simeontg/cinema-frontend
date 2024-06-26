import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        }
    }

    const svgLoader = {
      test: /\.svg$/,
      use: ['@svgr/webpack']
    }

    const cssLoader = {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          // "style-loader",
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          cssLoaderWithModules,
          'postcss-loader'
        ]
      }

    const babelLoader =  {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', {runtime: isDev ? 'automatic' : 'classic'}]]
          }
        }
    }
    return [ assetLoader, svgLoader, cssLoader, babelLoader]
}