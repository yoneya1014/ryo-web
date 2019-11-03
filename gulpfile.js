var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({
        'entries': ['./raw.js']
    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('default', gulp.task('build'));