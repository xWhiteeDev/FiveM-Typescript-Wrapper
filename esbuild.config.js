import {
    glob
} from "glob/raw";

import esbuild from 'esbuild'
const serverEntries = glob.sync('server/**/*.ts')
const clientEntries = glob.sync('client/**/*.ts')

await Promise.all([esbuild.build({
    bundle: false,
    entryPoints: [...clientEntries],
    outdir: './dist/client',
    outbase: 'client',
    minify: false,
    platform: 'neutral'
}), esbuild.build({
    bundle: false,
    entryPoints: [...serverEntries],
    outdir: './dist/server',
    outbase: 'server',
    minify: false,
    platform: 'node'
})])