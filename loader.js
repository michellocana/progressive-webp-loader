const _ = require('lodash')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const validateOptions = require('schema-utils')
const { getOptions, interpolateName } = require('loader-utils')
const mime = require('mime-types')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    imageminWebOptions: {
      type: 'object'
    }
  }
}

module.exports = function(source) {
  const defaultOptions = {
    name: '[path][name].[ext]',
    context: this.context,
    imageminWebOptions: {
      quality: 90
    }
  }
  const options = _.merge(defaultOptions, getOptions(this))
  const callback = this.async()

  validateOptions(schema, options, 'progressive-webp-loader')

  const nameOptions = {
    content: source,
    context: options.context
  }

  const name = interpolateName(this, options.name, nameOptions)
  const webpName = interpolateName(this, options.name.replace('[ext]', 'webp'), nameOptions)

  const getFileInfo = filename => ({
    src: filename,
    type: mime.lookup(filename.split('?')[0])
  })

  imagemin
    .buffer(source, {
      plugins: imageminWebp(options.imageminWebOptions)
    })
    .then(webpSource => {
      const data = {
        original: getFileInfo(name, source),
        webp: getFileInfo(webpName, webpSource)
      }

      this.emitFile(name, source)
      this.emitFile(webpName, webpSource)

      callback(null, `export default ${JSON.stringify(data)}`)
    })
    .catch(err => callback(err))
}

module.exports.raw = true
