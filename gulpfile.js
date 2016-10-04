var gulp = require('gulp');
var del = require('del');

var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var angularTemplateCache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('lint', function() {
    return gulp
        .src([
            './app/**/*.js',
            './app/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('styles', ['clean-styles'], function() {
    return gulp
        .src('./app/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./app/styles/'));
});

gulp.task('images', ['clean-images'], function() {
    return gulp
        .src('./app/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});

gulp.task('clean', function() {
    var files = [].concat('./build/', './.tmp/');
    return del(files);
});

gulp.task('clean-styles', function() {
    var files = './app/**/*.css';
    return del(files);
});

gulp.task('clean-images', function() {
    var files = './build/images/**/*.*';
    return del(files);
});

gulp.task('clean-code', function() {
    var files = [].concat(
        './.tmp/**/*.js',
        './build/**/*.html',
        '.build/**/*.js'
    );
    return del(files);
});

gulp.task('sass-watcher', function() {
    gulp.watch('./app/sass/*.scss', ['styles-watcher']);
});

gulp.task('templatecache', ['clean-code'], function() {
    return gulp
        .src('./app/**/*.html')
        .pipe(minifyHtml({ empty: true }))
        .pipe(angularTemplateCache(
            'templates.js', {
                module: 'myApp',
                standAlone: false,
                root: './'
            }
        ))
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('wiredep', function() {
    var options = {
        bowerJson: require('./bower.json'),
        directory: './bower_components',
        ignorePath: '../..'
    };
    var wiredep = require('wiredep').stream;

    return gulp
        .src('./app/index.html')
        .pipe(wiredep(options))
        .pipe(inject(gulp.src('./app/**/*.js')))
        .pipe(gulp.dest('./app/'));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    return gulp
        .src('./app/index.html')
        .pipe(inject(gulp.src('./app/styles/style.css')))
        .pipe(gulp.dest('./app/'));
});

gulp.task('styles-watcher', ['styles'], function() {
    var cssFilter = filter('**/*.css');

    return gulp
        .src('./app/index.html')
        .pipe(plumber())
        .pipe(useref({ searchPath: './' }))
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(gulp.dest('./build/'));
});

gulp.task('optimise', ['inject', 'images'], function() {
    var templateCache = './.tmp/templates.js';
    var cssFilter = filter('**/*.css', {restore: true});
    var jsLibFilter = filter('**/lib.js', {restore: true});
    var jsAppFilter = filter('**/app.js', {restore: true});

    return gulp
        .src('./app/index.html')
        .pipe(plumber())
        .pipe(inject(gulp.src(templateCache, { read: false }), {
            starttag: '<!-- inject:templates: js -->'
        }))
        .pipe(useref({ searchPath: './' }))
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(jsLibFilter)
        .pipe(uglify())
        .pipe(jsLibFilter.restore)
        .pipe(jsAppFilter)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(jsAppFilter.restore)
        .pipe(gulp.dest('./build/'));
});

gulp.task('connect', function() {
    connect.server({
        root: './build',
        port: 8888
    });
});

// default task
gulp.task('default',
  ['clean', 'optimise', 'sass-watcher', 'connect']
);

// production task
gulp.task('production',
  ['clean', 'lint', 'optimise', 'connect']
);
