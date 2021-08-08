
import pluginBabel from '@rollup/plugin-buble'
import resolve from 'rollup-plugin-node-resolve'

module.exports = {
    input: 'lib/resize.js',
    output: {
        file: 'lib/resize.umd.js',
        format: 'umd',
        name: 'resize'
    },
    plugins: [
        resolve(),
        pluginBabel()
    ]
};