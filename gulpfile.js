const gulp        = require("gulp"),
      sass        = require("gulp-sass"),
      browserSync = require("browser-sync"),
      useref      = require("gulp-useref"),
      gulpIf      = require("gulp-if"),
      cssnano     = require("gulp-cssnano"),
      imagemin    = require("gulp-imagemin"),
      uglify      = require("gulp-uglify"),
      del         = require("del"),
      runSequence = require("run-sequence"),
      cache       = require("gulp-cache");

// preprocessing with sass
gulp.task("sass", function() {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// spin a server using browser-sync
gulp.task("browserSync", function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    })
});

// concatenating files with useref
gulp.task("useref", function() {
    return gulp.src("app/*.html")
        .pipe(useref())
        .pipe(gulpIf("*.css", cssnano()))
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulp.dest("dist"))
});

// minifying images with imagemin
gulp.task("images", function() {
    return gulp.src("app/images/**/*.+(png|jpg|gif|svg)")
        .pipe(cache(imagemin()))
        .pipe(gulp.dest("dist/images"))
});

// copying views to dist 
gulp.task("views", function() {
    return gulp.src("app/views/**/*")
        .pipe(gulp.dest("dist/views"))
});

// cleaning files automatically
gulp.task("clean:dist", function() {
    return del.sync("dist");
});

// cleaning caches off the local system
gulp.task("cache:clear", function(callback) {
    return cache.clearAll(callback)
})

// watching files for changes
gulp.task("watch", ["browserSync", "sass"], function() {
    gulp.watch("app/scss/**/*.scss", ["sass"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
});


// COMMANDS
// setting up development
gulp.task("dev", function(callback) {
    runSequence(["sass", "browserSync", "watch"]);
});

// setting up production
gulp.task("build", function(callback) {
    runSequence("clean:dist", ["sass", "useref", "images", "views"], callback);
});
