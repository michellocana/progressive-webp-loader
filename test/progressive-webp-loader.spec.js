const path = require('path')

const webpack = require('webpack')
const MemoryFileSystem = require('memory-fs')

const fsMock = new MemoryFileSystem()

it('should compile without errors', () => {
  const compiler = webpack({
    mode: 'production',
    entry: path.resolve(__dirname, 'fixtures/entry.js'),
    module: {
      rules: [
        {
          test: /.(jpg|png)/,
          use: {
            loader: path.resolve(__dirname, '../loader.js')
          }
        }
      ]
    }
  })

  compiler.outputFileSystem = fsMock

  compiler.run((err, stats) => {
    expect(err).toBeNull
    expect(stats.hasErrors()).toBeFalsy
  })
})

it('should generate webp file in output', () => {
  const compiler = webpack({
    mode: 'production',
    entry: path.resolve(__dirname, 'fixtures/entry.js'),
    module: {
      rules: [
        {
          test: /.(jpg|png)/,
          use: {
            loader: path.resolve(__dirname, '../loader.js')
          }
        }
      ]
    }
  })

  compiler.outputFileSystem = fsMock

  compiler.run((err, stats) => {
    expect(stats.compilation.assets['jpg-image.webp']).toBeDefined
    expect(stats.compilation.assets['png-image.webp']).toBeDefined
  })
})

it('should keep original file', () => {
  const compiler = webpack({
    mode: 'production',
    entry: path.resolve(__dirname, 'fixtures/entry.js'),
    module: {
      rules: [
        {
          test: /.(jpg|png)/,
          use: {
            loader: path.resolve(__dirname, '../loader.js')
          }
        }
      ]
    }
  })

  compiler.outputFileSystem = fsMock

  compiler.run((err, stats) => {
    expect(stats.compilation.assets['jpg-image.jpg']).toBeDefined
    expect(stats.compilation.assets['png-image.png']).toBeDefined
  })
})

it('should generate custom filename', () => {
  const compiler = webpack({
    mode: 'production',
    entry: path.resolve(__dirname, 'fixtures/entry.js'),
    module: {
      rules: [
        {
          test: /.(jpg|png)/,
          use: {
            loader: path.resolve(__dirname, '../loader.js'),
            options: {
              name: '[name].[ext]?v=[contenthash]'
            }
          }
        }
      ]
    }
  })

  compiler.outputFileSystem = fsMock

  compiler.run((err, stats) => {
    expect(stats.compilation.assets['jpg-image.webp?v=9fe1a9f5e0d93e79c3db166aa72f0605']).toBeDefined
  })
})

it('should generate file in custom folder context', () => {
  const compiler = webpack({
    mode: 'production',
    entry: path.resolve(__dirname, 'fixtures/entry.js'),
    module: {
      rules: [
        {
          test: /.(jpg|png)/,
          use: {
            loader: path.resolve(__dirname, '../loader.js'),
            options: {
              context: path.resolve(__dirname, '..')
            }
          }
        }
      ]
    }
  })

  compiler.outputFileSystem = fsMock

  compiler.run((err, stats) => {
    expect(stats.compilation.assets['test/fixtures/jpg-image.webp']).toBeDefined
  })
})
