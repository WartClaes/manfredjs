var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    minifyCSS = require('gulp-minify-css'),
    config = {
        app: 'src',
        dist: 'build',
        port: 9000,
        scripts: function () {
            return this.app + '/js';
        },
        styles: function () {
            return this.app + '/sass';
        }
    };

config.scripts.apply(config);
config.styles.apply(config);

gulp.task('clean', function(cb) {
    rimraf(config.dist, cb);
});

gulp.task('lint', function() {
    var dir = config.scripts();

    return gulp.src([dir + '/*.js', dir + '/helpers/*.js', dir + '!/vendor/**/*.js'])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});

gulp.task('uglify', function () {
    var dir = config.scripts();

    return gulp.src(dir + '/manfred.js')
        .pipe($.plumber())
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest(config.dist + '/js'));
});

gulp.task('js-copy', function(){
    gulp.src(config.app + '/js/manfred.js')
    .pipe(gulp.dest(config.dist + '/js'));
});

gulp.task('compass', function() {
    var dir = config.styles();

    return gulp.src(dir + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.compass({
            config_file: './config.rb',
            css: config.app + '/css',
            sass: config.app + '/sass',
            style: 'expanded'
        }))
        .pipe(gulp.dest(config.app + '/css'));
});

gulp.task('minify-css', function () {
    return gulp.src(config.app + '/css/**/*.css')
        .pipe($.plumber())
        .pipe($.rename({suffix: '.min'}))
        .pipe(minifyCSS({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('css-copy', function(){
    gulp.src(config.app + '/css/**/*.css')
    .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('minify-end', function(){
    return gulp.src(config.app)
        .pipe($.notify({
            message: 'Build task complete'
        }));
});

gulp.task('images-copy', function(){
    gulp.src(config.app + '/img/close.png')
    .pipe(gulp.dest(config.dist + '/img'));
});

gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch(config.styles() + '/**/*.scss', ['compass']);

    // Watch .js files
    gulp.watch(config.scripts() + '/**/*.js', ['lint']);

});

// Default
gulp.task('default', ['compass'], function() {
    gulp.start('watch');
});

gulp.task('build', ['clean'], function(){
    gulp.start('js-copy', 'css-copy', 'images-copy', 'minify-css', 'uglify', 'minify-end');
});