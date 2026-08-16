import {
    glob
} from "glob/raw";

import esbuild from 'esbuild'
const serverEntries = glob.sync('server/**/*.ts')
const clientEntries = glob.sync('client/**/*.ts')
const sharedEntries = glob.sync('shared/**/*.ts')

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
}), esbuild.build({
    bundle: false,
    entryPoints: [...sharedEntries],
    outdir: './dist/shared',
    outbase: 'shared',
    minify: false,
    platform: 'neutral'
})])