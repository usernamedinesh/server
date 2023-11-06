const path = require('path');

module.exports = {
  entry: './server.js', // Entry point of your Node.js server
  target: 'node', // Specify that this is a Node.js environment
  output: {
    filename: 'bundle.js', // Name of the output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'production', // Or 'development' for development mode
  externals: {
    'fs': 'commonjs fs', // Add 'fs' and any other required core modules
    'path': 'commonjs path', // You can add more if needed
  },
  resolve: {
    alias: {
      '@mapbox/node-pre-gyp': path.resolve(__dirname, 'node_modules/@mapbox/node-pre-gyp')
    }
  },
  module: {
    rules: [
      // Add other rules for handling different file types
      {
        test: /\.cs$/,
        use: 'raw-loader' // Use raw-loader to load .cs files
      },
      // Add an ignore-loader for binary files
      {
        test: /\.(linux-x64-musl.node|musl-x64.node|linux-x64-gnueabihf.node|linux-x64-gnu.node|linux-x64-node-12.node|linux-x64-node-14.node|linux-x64-node-16.node|linux-x64-node-64.node)$/,
        use: 'ignore-loader',
      },
      {
        test: /\.html$/,
        use: 'ignore-loader',
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ],
  },
};
