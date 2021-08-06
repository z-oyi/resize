const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const ts = require('rollup-plugin-typescript2')
const styles = require('rollup-plugin-styles')
const path = require('path')
const browserSync = require("browser-sync").create();
const getPath = _path => path.resolve(__dirname, _path)
const packageJSON =  require('./package.json')
const extensions = [
    '.js',
    '.ts',
    '.tsx'
]

const tsPlugin = ts({
    tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
    extensions
})



const config = {
    input: 'src/main.ts',
    output: [
        {
            file: packageJSON.main, // 通用模块
            format: 'umd',
            name: 'oresize'
        },
        {
            file: packageJSON.module, // es6模块
            format: 'es',
            name: 'oresize'
        },
        {
            file: 'dist/bundle.js',
            format: 'umd',
            name: 'oresize',
            assetFileNames: "[name][extname]"
        }
    ],
    plugins: [
        styles({
            mode: "extract"
        }),
        resolve(extensions),
        commonjs(),
        tsPlugin,
    ]
};
const watcher = rollup.watch(config)
watcher.on('event', event => {
    if (event.code === 'END') {}
    if (event.code === 'ERROR') {
        console.log(event)
    }
});
  

browserSync.init({
    server: "./dist",
    files: ["dist/css/bundle.css", "dist/**/*.js", "dist/index.html"],
    open: false
})