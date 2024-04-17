import webpack from 'webpack';
import path from 'path';
import { BuildMode, BuildPaths } from './config/webpack/types/types';
import { buildWebpack } from './config/webpack/buildWebpack';

interface EnvVariables {
    mode: BuildMode,
    port?: number,
    analyzer?: boolean
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }

    const config: webpack.Configuration =  buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        });
    
    return config;
}