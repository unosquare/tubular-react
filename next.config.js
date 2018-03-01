const isProd = process.env.NODE_ENV === 'production';
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  assetPrefix: isProd ? 'https://unosquare.github.io/tubular-react/' : '',
  webpack: (config, { dev }) => {
    config.module.rules.push({ test: /\.ts|\.tsx$/, loader: ['ts-loader'], include: __dirname });
    return config;
  },
  exportPathMap: function() {
    return {
      '/src/docs/modules/pages/': { page: '/tubular-react' },
      '/src/docs/modules/pages/Sample': { page: '/tubular-react/Sample' },
      '/src/docs/modules/pages/Documentation/ColumnModel': { page: '/tubular-react/Documentation/ColumnModel' },
      '/src/docs/modules/pages/Documentation/DataSource': { page: '/tubular-react/Documentation/DataSource' },
      '/src/docs/modules/pages/Documentation/Getting-Started': { page: '/tubular-react/Documentation/Getting-Started' },
      '/src/docs/modules/pages/Documentation/Props': { page: '/tubular-react/Documentation/Props' }
    }
  },
});
