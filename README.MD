gulp-angularjs-boilerplate
=====================================

A boilerplate using AngularJS, SASS and Gulp that uses John Papa's [John Papa's AngularJs Best Practices](https://github.com/johnpapa/angular-styleguide).

The following Gulp tasks are performed to create a production ready build with source maps for debugging

- **ESLint**
- **SASS**
- **AutoPrefixer**
- **Inject**
- **ImageMin**
- **Minify-HTML**
- **Angular-Template-Cache**
- **CSSO**
- **Uglify**
- **ngAnnotate**
- **SourceMaps**

---

### Getting up and running

1. Clone this repo from `https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate.git`
2. Run `npm install` from the root directory
3. Run `bower install` from the root directory
4. Run `gulp` to start a webserver on `http://localhost:8888/` serving files from the `/build` directory and watch for SASS changes

OR

4. Run `gulp production` to start a webserver on `http://localhost:8888/` serving files from the `/build` directory
