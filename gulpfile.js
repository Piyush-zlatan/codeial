const gulp = require('gulp');

const sass = require('gulp-sass');
const CSSnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default

// gulp contains task to be done and pipe function calls the middleware

gulp.task('css',function(done){
    console.log('minifying CSS');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(CSSnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js',function(done){
    console.log('minifying Js');
    gulp.src('./assets/sass/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('.public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

//Empty the public assets directory
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build',gulp.series('clean:assets','css','js'),function(done){
    console.log('Building assets..');
    done();
})