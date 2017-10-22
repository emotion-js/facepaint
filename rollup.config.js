import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import cjs from 'rollup-plugin-commonjs'
import path from 'path'

const pkg = require(path.resolve(process.cwd(), './package.json'))

const config = {
  entry: './src/index.js',
  exports: 'named',
  sourceMap: true,
  plugins: [
    babel({
      presets: [
        [
          'env',
          {
            loose: true,
            modules: false,
            exclude: ['transform-es2015-typeof-symbol']
          }
        ],
        'stage-0',
        'react',
        'flow'
      ],
      plugins: ['codegen', 'external-helpers'],
      babelrc: false
    }),
    cjs()
  ],
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ]
}

if (process.env.UMD) {
  config.plugins.push(
    uglify()
  )
  config.targets = [
    {
      dest: './dist/facepaint.umd.min.js',
      format: 'umd',
      moduleName: pkg.name
    }
  ]
}

export default config
