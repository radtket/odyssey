import gulp from "gulp";
import autoprefixer from "autoprefixer";
import browsersync from "browser-sync";
import cssnano from "cssnano";
import del from "del";
import eslint from "gulp-eslint";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import sass from "gulp-sass";
import webpack from "webpack";
import webpackstream from "webpack-stream";
import babel from "gulp-babel";
import sassGlob from "gulp-sass-glob";
import sourcemaps from "gulp-sourcemaps";
import webpackconfig from "./webpack.config";

browsersync.create();

// project
const project = { root: __dirname };
project.dist = `${project.root}/docs`;

project.assets = `${project.root}/src`;
project.img = `${project.assets}/img`;
project.scss = `${project.assets}/scss`;
project.js = `${project.assets}/js`;
project.video = `${project.assets}/video`;
project.favicon = `${project.assets}/favicon`;

// BrowserSync
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: `${project.dist}/`
		},
		port: 3000
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// Clean assets
function clean() {
	return del([`${project.dist}`]);
}

// Copy Favicon Assets
function favicon() {
	return gulp.src(`${project.favicon}/**/*`).pipe(gulp.dest(`${project.dist}`));
}

// Minify HTML
function html() {
	return gulp
		.src(`${project.assets}/*.html`)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(`${project.dist}`));
}

// Copy Video Assets
function video() {
	return gulp
		.src(`${project.video}/**/*`)
		.pipe(gulp.dest(`${project.dist}/video/`));
}

// Optimize Images
function images() {
	return gulp
		.src(`${project.img}/**/*`)
		.pipe(newer(`${project.dist}/img/`))
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{
							removeViewBox: false,
							collapseGroups: true
						}
					]
				})
			])
		)
		.pipe(gulp.dest(`${project.dist}/img/`));
}

// CSS task
function css() {
	return gulp
		.src(`${project.scss}/**/*.scss`)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(gulp.dest(`${project.dist}/css/`))
		.pipe(rename({ suffix: ".min" }))
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulp.dest(`${project.dist}/css/`))
		.pipe(browsersync.stream());
}

// Lint scripts
function scriptsLint() {
	return gulp
		.src([`${project.js}/**/*`, "./gulpfile.babel.js"])
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format());
	// .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
	return (
		gulp
			.src([`${project.js}/**/*`])
			.pipe(babel())
			.pipe(plumber())
			.pipe(webpackstream(webpackconfig, webpack))
			// folder only, filename is specified in webpack config
			.pipe(gulp.dest(`${project.dist}/js/`))
			.pipe(browsersync.stream())
	);
}

// Watch files
function watchFiles() {
	gulp.watch(`${project.assets}/*.html`, html);
	gulp.watch(`${project.scss}/**/*`, css);
	gulp.watch(`${project.js}/**/*`, gulp.series(scriptsLint, scripts));
	gulp.watch(`${project.img}/**/*`, images);
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(
	clean,
	gulp.parallel(html, css, favicon, images, js, video)
);
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
export { html, images, favicon, video, css, js, clean, build, watch };

export default build;
