const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  webpack: (config, { dev }) => {
    config.module.rules.push({ test: /\.ts|\.tsx$/, loader: ['ts-loader'], include: __dirname });
    return config;
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/Sample': { page: '/Sample' },
      '/Documentation/ColumnModel': { page: '/Documentation/ColumnModel' },
      '/Documentation/DataSource': { page: '/Documentation/DataSource' },
      '/Documentation/Getting-Started': { page: '/Documentation/Getting-Started' },
      '/Documentation/Props': { page: '/Documentation/Props' },
    }
  }
});