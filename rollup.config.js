import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import path from 'path'

const pkg = require(path.resolve(process.cwd(), './package.json'))

const config = {
  entry: './src/index.js',
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
        ]
      ],
      babelrc: false
    })
  ],
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ]
}

if (process.env.UMD) {
  config.plugins.push(uglify())
  config.targets = [
    {
      dest: './dist/facepaint.umd.min.js',
      format: 'umd',
      moduleName: pkg.name
    }
  ]
}

export default config
