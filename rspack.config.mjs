import { defineConfig } from '@rspack/cli';

export default defineConfig({
  entry: {
    main: './src/index.mjs',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    chunkIds: 'named',
    moduleIds: 'named',
    concatenateModules: false,
  },
  experiments: {
    css: true,
  },
});
