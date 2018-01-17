const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const copy = require('gulp-copy');
const mocha = require('gulp-mocha');

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

gulp.task('default', ['clean:build']);