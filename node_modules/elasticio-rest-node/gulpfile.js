var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');
var jscs = require('gulp-jscs');

var paths = {
    code: ['./lib/**/*.js'],
    spec: ['./spec/**/*.spec.js'],
    coverageReport: 'coverage/lcov.info'
};

gulp.task('jscs', () => {
    return gulp
        .src([
            './lib/**/*.js'
        ])
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

gulp.task('jasmine', () => {
    return gulp
        .src(paths.spec)
        .pipe(jasmine({
            includeStackTrace: true,
            verbose: true
        }));
});

gulp.task('coveralls', ['coverage'], () => {
    return gulp.src(paths.coverageReport).pipe(coveralls());
});

gulp.task('coverage', cb => {
    gulp
        .src(paths.code)
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', () => {
            gulp
                .src(paths.spec)
                .pipe(jasmine())
                .pipe(istanbul.writeReports())
                .on('end', cb);
        });
});

gulp.task('test', ['jasmine']);
gulp.task('default', ['test']);
