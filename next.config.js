const dev = process.env.NODE_ENV.trim() === 'development';

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/Sample': { page: '/Sample' },
      '/Documentation/ColumnModel': { page: '/Documentation/ColumnModel' },
      '/Documentation/DataSource': { page: '/Documentation/DataSource' },
      '/Documentation/Getting-Started': { page: '/Documentation/Getting-Started' },
      '/Documentation/Props': { page: '/Documentation/Props' },
    }
  },
  assetPrefix: !dev ? '/tubular-react':''
}