const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();
const ghpages = require('gh-pages');

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// Scripts

const scriptMain = () => {
  return gulp.src("source/js/script.js")
    // .pipe(gulp.dest("build/js"))
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scriptMain = scriptMain;

const scriptModal = () => {
  return gulp.src("source/js/modal.js")
    .pipe(gulp.dest("build/js"))
    .pipe(terser())
    .pipe(rename("modal.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scriptModal = scriptModal;

const scriptSendMail = () => {
  return gulp.src("source/js/sendMail.js")
    .pipe(gulp.dest("build/js"))
    .pipe(terser())
    .pipe(rename("sendMail.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scriptSendMail = scriptSendMail;


// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg,gif}")
    .pipe(gulp.dest("build/img"))
}

exports.images = copyImages;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/*.pdf",
    "source/img/**/*.svg",
    "!source/img/icons/*.svg",
    "source/*.webmanifest",
    "source/PHPMailer/**/*",
    "source/sendMail.php"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scriptMain));
  gulp.watch("source/js/modal.js", gulp.series(scriptModal));
  gulp.watch("source/js/sendMail.js", gulp.series(scriptSendMail));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scriptMain,
    scriptModal,
    scriptSendMail,
    sprite,
    createWebp
  ),
);

exports.build = build;

// gh-pages
ghpages.publish("build", function () {});

// Default
exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scriptMain,
    scriptModal,
    scriptSendMail,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
