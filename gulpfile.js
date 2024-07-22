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

// fetch command line arguments
const arg = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {

            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;

        }
        else {

            // argument name
            curOpt = opt;
            arg[curOpt] = true;

        }

    }

    return arg;

})(process.argv);


// Compile SCSS files and minify CSS files
gulp.task('sass', () => {

    return (gulp.src(options.assets.dist +'/css/sass/base.scss')
        .pipe(sass())
        .pipe(gulp.dest(options.assets.dist +'/css'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(options.assets.dist +'/css'))
        .pipe(sync.stream()));

});

gulp.task('compressDepsAngular', () => {
    return gulp.src([options.assets.dist +'/js/angular/modules/*.js'])
        .pipe(concat('angular-dependancies.js'))
        .pipe(gulp.dest(options.assets.dist +'/js/angular/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(options.assets.dist +'/js/angular/'));
});

gulp.task('compress', () => {
    return gulp.src(
        [
            options.assets.dist +'/js/jquery.min.js',
        ]
    )
        .pipe(concat('main.js'))
        .pipe(gulp.dest(options.assets.dist +'/js/main-js/'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(options.assets.dist +'/js/main-js/'));
});

gulp.task('deploy',  () =>
{
    newName    = new Date().getTime() + '.js';
    newNameCss = new Date().getTime() + '.css';
    getEnv     = arg.env || 'prod';

    console.log("ici getEnv =>", getEnv);
    return (
        gulp.src([options.assets.dist +'/js/angular/BACKOFFICE.js'])
            .pipe(rename(newName))
            .pipe(replace(options.links_back.dev, options.links_back[getEnv]))
            .pipe(gulp.dest(options.assets.dist +'/js/angular/'))
        && gulp.src([options.assets.dist +'/css/base.min.css'])
            .pipe(rename(newNameCss))
            .pipe(gulp.dest(options.assets.dist +'/css/'))
        && gulp.src(['*.html'], {base: "./"})
            .pipe(replace(options.assets.dist +'/css/base.min.css', options.assets.dist +'/css/'+newNameCss))
            .pipe(replace(options.assets.dist +'/js/angular/BACKOFFICE.js', options.assets.dist +'/js/angular/'+newName))
            .pipe(gulp.dest("./"))
    )
});

gulp.task('watch', function(){
    // browserSync.init({
    //     proxy: "http://localhost/" + options.links_front.dev,
    //     port: options.port + 1
    // });

    gulp.watch(options.assets.dist +'/css/sass/components/*.scss', gulp.series('sass'));

    gulp.watch(['*.html','partials/*.html', options.assets.dist +'/js/*.js', options.assets.dist +'/css/*.css', options.assets.dist +'/css/sass/*.scss', options.assets.dist +'/css/sass/components/*.scss']).on('change', browserSync.reload);

    gulp.watch(options.assets.dist +'/js/angular/*.js', gulp.series('compressDepsAngular'));

    gulp.watch([options.assets.dist +'/js/*.js'], gulp.series('compress'));

    gulp.watch([options.assets.dist +'/js/*.js', options.assets.dist +'/js/**/*.js', options.assets.dist +'/js/angular-dependancies/*.js']).on('change', browserSync.reload);

});

// permet de demarer le gulp par default
gulp.task('default', gulp.series('sass','compressDepsAngular','compress','watch'));

