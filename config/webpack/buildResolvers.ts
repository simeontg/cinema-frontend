import { Configuration } from "webpack";
import { BuildPaths } from "./types/types";

export function buildResolvers(buildPaths: BuildPaths): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [buildPaths.src, 'node_modules'],
    }
}