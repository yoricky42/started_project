var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass'))
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    concat = require('gulp-concat');
    minify = require('gulp-minify');
    sync = require('browser-sync').create();
    cleanCSS = require('gulp-clean-css');
    replace = require('gulp-replace');
    del = require('del');
browserSync = require('browser-sync').create();

const options = require("./package.json").options;

// Compile SCSS files and minify CSS files
gulp.task('sass', () => {
    return (gulp.src(options.dir.public +'/sass/index.scss')
        .pipe(sass())
        .pipe(gulp.dest(options.dir.app +'/styles'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(options.dir.app +'/styles'))
        .pipe(sync.stream()));
});

gulp.task('watch', function(){
    gulp.watch(options.dir.sassfiles +'*.scss', gulp.series('sass'));
    gulp.watch([options.dir.app +'/styles/*.css']).on('change', browserSync.reload);
});

// permet de demarer le gulp par default
gulp.task('default', gulp.series('sass','watch'));

