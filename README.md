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
      <source srcSet={image.webp} type='image/webp' />
      
      {/* Fallback image for browsers that don't support WebP  */}
      <source srcSet={image.original} type='image/jpeg' />
      
      {/* Fallback iamge for browsers that don't support srcset  */}
      <img src={image.original} />
    </picture>
  )
}
```
