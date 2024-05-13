export interface BuildPaths {
    entry: string;
    src: string;
    output: string;
    html: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    analyzer?: boolean;
}