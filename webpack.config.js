const path = require('path');

module.exports = {
  theme: {
    extend: {
      keyframes: {
        gradientChange: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'gradient-change': 'gradientChange 3s ease infinite',
      },
    },
  },
  entry: './src/index.js',  // Adjust this path to your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'ignore-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|pdf)$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
};
