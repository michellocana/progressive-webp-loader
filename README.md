<a href="https://www.npmjs.com/package/progressive-webp-loader" target="_blank">
  <img src="https://img.shields.io/npm/v/progressive-webp-loader.svg" alt="progressive-webp-loader">
</a>

<a href="https://webpack.js.org" target="_blank">
  <img src="https://img.shields.io/badge/webpack-%5E4.0.0-blue.svg?logo=webpack&style=flat" alt="webpack">
</a>

# progressive-webp-loader
Load WebP images progressively with webpack 4.
Inspired by [webp-loader](https://www.npmjs.com/package/webp-loader).

## Installation
```npm i --save-dev progressive-webp-loader```

## Options
`name`
* Type: `String`
* Default: `[path][name].[ext]`

`context`
* Type: `String`
* Default: context

## Basic Configuration
```js
// webpack.config.js

module.exports = {
  // ... your webpack config
  module: {
    rules: [
      {
        test: /.(jpe?g|png)/,
        use: 'progressive-webp-loader'
      }
    ]
  }
}
```

## Advanced configuration - Providing custom file name
```js
// webpack.config.js

module.exports = {
  // ... your webpack config
  module: {
    rules: [
      {
        test: /.(jpe?g|png)/,
        use: {
          loader: 'progressive-webp-loader',
          options: {
            name: '[path][contenthash].[ext]'
          }
        }
      }
    ]
  }
}
```

## Advanced configuration - Providing webpack file context
```js
// webpack.config.js
const path = require('path')

module.exports = {
  // ... your webpack config
  module: {
    rules: [
      {
        test: /.(jpe?g|png)/,
        use: {
          loader: 'progressive-webp-loader',
          options: {
            context: path.resolve(__dirname, 'foo/bar')
          }
        }
      }
    ]
  }
}
```

## Usage example (with React)
```jsx
import React from 'react'
import image from './test.jpg'

const Foo = () => {
  return (
    <picture>
      {/* WebP image for browsers that support it  */}
      <source srcSet={image.webp.src} type={image.webp.type} />

      {/* Fallback image for browsers that don't support WebP  */}
      <source srcSet={image.original.src} type={image.original.type} />

      {/* Fallback iamge for browsers that don't support srcset  */}
      <img src={image.original.src} />
    </picture>
  )
}
```
