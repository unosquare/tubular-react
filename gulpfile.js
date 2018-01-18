const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const copy = require('gulp-copy');
const mocha = require('gulp-mocha');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const browserSync = require('browser-sync').create();
const source = require('vinyl-source-stream');

function map_error(err) {
  console.log('Error : ' + err.message);
  this.emit('end');
}

function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./example/app'));
}

gulp.task('watchify', () => {
  const bundler = watchify(browserify('./example/src/app.js', Object.assign(watchify.args, { debug: true }))
    .transform('babelify', { presets: ['es2015', 'react', 'stage-0'] }), { verbose: true });
  bundle_js(bundler);
  bundler.on('update', () => {
    bundle_js(bundler);
  });
  bundler.on('log', msg => {
    console.log(msg);
  });
});

gulp.task('browserSync', () => {
  browserSync.init({
    notify: false,
    port: 3000,
    open: true,
    server: {
      baseDir: ['example/app']
    }
  });
  gulp.watch('example/app/bundle.js').on('change', browserSync.reload);
});

gulp.task('build', () =>
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-0', 'react']
    }))
    .pipe(gulp.dest('build/')));

gulp.task('build:clean', () => {
  del.sync(['build']);
});

gulp.task('build:copy', () =>
  gulp.src(['package.json', 'README.md', 'LICENSE'])
    .pipe(copy('build/', { prefix: 1 })));

gulp.task('clean:build', ['build:clean', 'build', 'build:copy']);

gulp.task('test', () => gulp.src(['test/**/*.spec.js'])
  .pipe(mocha({
    reporter: 'spec',
    require: ['babel-register', 'test/helpers/browser.js']
  })));

gulp.task('default', ['build:clean', 'build']);

gulp.task('watch', ['watchify', 'browserSync']);