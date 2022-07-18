// HTML
import pug from 'gulp-pug'

// CSS
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'

// SASS
import dartSass from 'sass'; // Módulo de sass oficial en nodejs
import gulpSass from 'gulp-sass'; // Módulo de sass de gulp
const sass = gulpSass(dartSass); // Creando la constante sass para la tarea de SASS

// JavaScript
import gulp from 'gulp' // Importar gulp para crear tareaws
import babel from 'gulp-babel' // Importar babel para transpilar el código
import terser from 'gulp-terser' // Para ofuscar y minificar el código 

// Caché bust
const cachebust = require('gulp-cache-bust')

// Plumber -> Para evitar que cuando ocurra un fallo se detenga el servidor con las Tareas
import plumber from 'gulp-plumber'

// Browser sync
import { init as server, stream, reload } from 'browser-sync' // Estas dependencias se usan 
 

// Variables - constantes
// Para indicar a alguna tarea que compile en modo de producción o desarrollo
// Solo poner esta constante en true cuando todo el código esté depurado y listo para producción
const production = true;

const cssPlugins = [
  autoprefixer()
]

// REVIEW: Tareas de Gulp

// Tarea para sass
gulp.task('sass', () => { 
  return gulp
  .src('./src/scss/*.scss')
  .pipe(plumber())
  .pipe(sass({
    outputStyle: "compressed" // Para optimizar código css
  }))
  .pipe(postcss(cssPlugins))  
  .pipe(gulp.dest('./public/css'))
  .pipe(stream())
})

// Tarea para JavaScript, en este caso para transpilar, ofuscar y minificar
gulp.task('babel', () => { 
  return gulp
    .src('./src/js/*.js') // src para indicar la carpeta de desarrollo de los archivos js
    .pipe(plumber())
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./public/js')) // este pipe es para indicar el destino en donde se dejerá el resultado de la tarea
});

// Tarea para pug
gulp.task('views', () => { 
  return gulp
  .src('./src/views/*.pug')
  .pipe(plumber())
  .pipe(pug({ 
    pretty: production ? false : true,
    data: {
      require: require
    }
  }))
  .pipe(cachebust({
    type: 'timestamp'
  }))
  .pipe(gulp.dest('./public'))
});


// IMPORTANT: Esta es una tarea para ejecutar automáticamente las tareas anteriores

// Tarea por defecto para vigilar los cambios y realizar las tareas automáticamente
gulp.task('default', () => {
  server({
    server: './public'
  })
  // gulp.series -> ejecuta las tareas de forma secuencial
  // gulp.parallel -> ejecuta las tareas de forma paralela
  gulp.watch('./src/views/**/*.pug', gulp.series('views')).on('change', reload); // Los ** indican que cuando cambie cualquier subcarpeta se dispare el watch
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
  gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload); //
});

