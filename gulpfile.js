const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function moveFiles() {
	return gulp.src('src/**/*.html').pipe(gulp.dest('app'));
}

function css() {
	return src('sass/**/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(dest('app'))
		.pipe(browserSync.stream());
}

function images() {
	gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('app/images'));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: 'app',
		},
	});
	gulp.watch('./sass/**/*.scss', css);
	gulp.watch('app/*.html').on('change', browserSync.reload);
}

exports.watch = watch;
exports.moveFiles = moveFiles;
exports.images = images;
exports.css = css;
