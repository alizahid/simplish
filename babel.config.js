module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@pickle/client': './client',
          '@pickle/components': './components',
          '@pickle/hooks': './hooks',
          '@pickle/server': './server',
          '@pickle/types': './types'
        },
        extensions: ['.ts', '.tsx'],
        root: ['.']
      }
    ]
  ],
  presets: ['next/babel']
}
