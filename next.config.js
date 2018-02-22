const debug = process.env.NODE_ENV !== "prod";
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
  assetPrefix: debug ? 'https://unosquare.github.io/tubular-react/':''
}