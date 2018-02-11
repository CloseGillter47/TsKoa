const gulp = require("gulp");
const del = require("del");
const gulpMocha = require("gulp-mocha");
const runSequence = require("run-sequence");
const sourceMaps = require("gulp-sourcemaps");
const tsc = require("gulp-typescript");
const uglify = require("gulp-uglify");

gulp.task("clean", (done) => {
    return del(['dist/bin'], done);
});

gulp.task("copy", () => {
    return gulp.src("bin/*")
        .pipe(gulp.dest("dist/bin"));
});

gulp.task("copy:views", () => {
    return gulp.src("./src/views/*.pug")
        .pipe(gulp.dest("dist/views"));
});
gulp.task("copy:assets", () => {
    return gulp.src("./src/public/**/*.*")
        .pipe(gulp.dest("dist/public"));
});

gulp.task("build:koa2", () => {
    const project = tsc.createProject("./src/tsconfig.json");
    const result = gulp.src("./src/**/*.ts")
        .pipe(sourceMaps.init())
        .pipe(project());
    return result.js
        // .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("test:koa2", () => {

    gulp.src("dist/tests", { read: false })
        .pipe(gulpMocha());
});

gulp.task("default", (done) => {
    runSequence("clean", "copy", "copy:views", "copy:assets", "build:koa2");
})