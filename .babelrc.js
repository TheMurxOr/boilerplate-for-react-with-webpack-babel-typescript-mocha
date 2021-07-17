require('@babel/register')({ extensions: ['.ts', '.tsx', '.js', '.jsx'] })

module.exports = {
  env: {
    production: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              browsers: ['cover 99%'],
            },
          },
        ],
        '@babel/typescript',
        '@babel/react',
      ],
      plugins: [
        // '@babel/plugin-proposal-class-properties',
        // '@babel/proposal-object-rest-spread',
        // '@babel/transform-runtime',
        // "babel-plugin-dynamic-import-node",
      ],
      comments: false,
    },
    development: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            // debug: true,
            targets: {
              browsers: ['> .5% and last 2 versions'],
            },
          },
        ],
        '@babel/react',
        ['@babel/typescript', { isTSX: true, allExtensions: true }],
      ],
      plugins: [
        'react-hot-loader/babel',
        // '@babel/plugin-proposal-class-properties',
        // '@babel/proposal-object-rest-spread',
        // '@babel/transform-runtime',
        // 'babel-plugin-dynamic-import-node',
      ],
    },
    test: {
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: false,
          },
        ],
        '@babel/react',
        ['@babel/typescript', { isTSX: true, allExtensions: true }],
      ],
      plugins: [
        // '@babel/plugin-proposal-class-properties',
        // '@babel/proposal-object-rest-spread',
        // '@babel/transform-runtime',
        // 'babel-plugin-dynamic-import-node',
      ],
    },
  },
}
