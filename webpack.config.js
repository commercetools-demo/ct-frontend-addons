import path from 'node:path';

export default {
  entry: {
    'approval-workflows': './src/approval-workflows/frontend/index.tsx',
    'configurable-products': './src/configurable-products/frontend/index.tsx',
    superuser: './src/superuser/frontend/index.tsx',
    'superuser-b2b': './src/superuser-b2b/frontend/index.tsx',
  },
  output: {
    path: path.resolve(path.resolve(), 'dist'), // Use node:path to resolve the output path
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: ['@babel/plugin-transform-typescript'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
