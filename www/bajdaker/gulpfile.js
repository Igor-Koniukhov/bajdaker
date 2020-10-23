// VARIABLES & PATHS

let preprocessor = 'scss', // Preprocessor (sass, scss, less, styl)
	fileswatch = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
	imageswatch = 'jpg,jpeg,png,webp,svg', // List of img extensions for watching & compression (comma separated)
	baseDir = '_site', // Base directory path without «/» at the end
	/*baseDir2 = '_site', // Base directory path without «/» at the end*/
	online = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: {
		src: [
			'libs/swiper/swiper.js',
			'libs/likely/likely.js',
			'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
			'js/app.js' // app.js. Always at the end
		],
		dest: 'js',
		dest2: '_site/js',
	},

	styles: {
		src: 'scss/main.scss',
		dest: 'css',
		dest2: '_site/css',
	},

	images: {
		src: '/img/_src/**/*',
		dest: '/img/dest',
	},

	deploy: {
		hostname: 'username@yousite.com', // Deploy hostname
		destination: 'yousite/public_html/', // Deploy destination
		include: [/* '*.htaccess' */], // Included files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files from deploy
	},

	cssOutputName: 'app.min.css',
	jsOutputName: 'app.min.js',

}

// LOGIC

const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const scss = require('gulp-sass');
const less = require('gulp-less');
const styl = require('gulp-stylus');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rsync = require('gulp-rsync');
const del = require('del');

function browsersync() {
	browserSync.init({
		server: {baseDir: baseDir + '/'},
		notify: false,
		online: online
	})
}

function scripts() {
	return src(paths.scripts.src)
		.pipe(concat(paths.jsOutputName))
		.pipe(uglify())
		.pipe(dest(paths.scripts.dest))
		.pipe(dest(paths.scripts.dest2))
		.pipe(browserSync.stream())
}

function styles() {
	return src(paths.styles.src)
		.pipe(eval(preprocessor)())
		.pipe(concat(paths.cssOutputName))
		.pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
		.pipe(cleancss({level: {1: {specialComments: 0}},/* format: 'beautify' */}))
		.pipe(dest(paths.styles.dest))
		.pipe(dest(paths.styles.dest2))
		.pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
		.pipe(newer(paths.images.dest))
		.pipe(imagemin())
		.pipe(dest(paths.images.dest))
}

function cleanimg() {
	return del('' + paths.images.dest + '/**/*', {force: true})
}

function deploy() {
	return src(baseDir + '/')
		.pipe(rsync({
			root: baseDir + '/',
			hostname: paths.deploy.hostname,
			destination: paths.deploy.destination,
			include: paths.deploy.include,
			exclude: paths.deploy.exclude,
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

function startwatch() {
	watch(preprocessor + '/**/*', {usePolling: true}, styles);
	watch(baseDir + '/img/_src/**/*.{' + imageswatch + '}', {usePolling: true}, images);
	watch(baseDir + '/**/*.{' + fileswatch + '}', {usePolling: true}).on('change', browserSync.reload);
	watch(['js/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], {usePolling: true}, scripts);
}

exports.browsersync = browsersync;
exports.assets = series(cleanimg, styles, scripts, images);
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanimg = cleanimg;
exports.deploy = deploy;
exports.default = parallel(images, styles, scripts, browsersync, startwatch);
