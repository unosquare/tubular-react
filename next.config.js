const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  assetPrefix: '/tubular-react/',
  webpack: (config, { dev }) => {
    config.module.rules.push({ test: /\.ts|\.tsx$/, loader: ['ts-loader'], include: __dirname });
    return config;
  },
  exportPathMap: function() {
    return {
      '/': { page: '/tubular-react' },
      '/Sample': { page: '/tubular-react/Sample' },
      '/Documentation/ColumnModel': { page: '/tubular-react/Documentation/ColumnModel' },
      '/Documentation/DataSource': { page: '/tubular-react/Documentation/DataSource' },
      '/Documentation/Getting-Started': { page: '/tubular-react/Documentation/Getting-Started' },
      '/Documentation/Props': { page: '/tubular-react/Documentation/Props' }
    }
  },
});
