import browserSync from 'browser-sync';
import fs from 'fs';
import gulp from 'gulp';
import ejs from 'gulp-ejs';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import gulpSass from 'gulp-sass';
import ts from 'gulp-typescript';
import dartSass from 'sass';
const sass = gulpSass(dartSass);
const tsProject = ts.createProject('tsconfig.json');

const EJScompile = (done) => {
	const data = JSON.parse(fs.readFileSync('./data.json'));
	gulp.src(['./src/*.ejs', '!./src/_*.ejs'])
		.pipe(ejs(data))
		.pipe(ejs({}, {}, { ext: '.html' }))
		.pipe(rename({ extname: '.html' }))
		.pipe(replace(/^[ \t]*\n/gim, ''))
		.pipe(gulp.dest('./dist/'));
	done();
};

const SassCompile = (done) => {
	gulp.src('./src/scss/style.scss')
		.pipe(
			sass.sync({
				outputStyle: 'expanded',
			}),
		)
		.on('error', sass.logError)
		.pipe(gulp.dest('./dist/scss/'));
	done();
};

const TsCompile = (done) => {
	gulp.src('./src/ts/*.ts').pipe(tsProject()).js.pipe(gulp.dest('dist/ts/'));
	done();
};

const ImageCompile = (done) => {
	gulp.src('src/assets/images/*').pipe(imagemin()).pipe(gulp.dest('dist/assets/images'));
	done();
};

const reloadFile = (done) => {
	browserSync.init({
		server: {
			baseDir: './dist/',
		},
	});
	done();
};

const reloadBrowser = (done) => {
	browserSync.reload();
	done();
};

export { EJScompile };
export { SassCompile };
export { TsCompile };
export { ImageCompile };
export { reloadFile };
export { reloadBrowser };

const watchFiles = (done) => {
	gulp.watch(['./src/*.ejs', '!./src/_*.ejs'], EJScompile);
	gulp.watch('./src/scss/*.scss', SassCompile);
	gulp.watch('./src/ts/*.ts', TsCompile);
	gulp.watch('./src/assets/images/*', ImageCompile);
	gulp.watch('./dist/*.html', reloadBrowser);
	gulp.watch('./dist/scss/*.css', reloadBrowser);
	gulp.watch('./dist/ts/*.js', reloadBrowser);
	done();
};

export default gulp.series(
	watchFiles,
	EJScompile,
	SassCompile,
	TsCompile,
	ImageCompile,
	reloadFile,
);
