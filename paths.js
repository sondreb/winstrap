var utils = require('./utils');

// Until we remove dual gulp compile, we must override this setting.
utils.paths.destinationPath = 'distgulp';

var paths = {
    node: utils.getPath('node_modules'),
    source: {
        style:  utils.getSourcePath('scss', 'winstrap.scss'),
        styles:  utils.getSourcePath('**/*.scss'),
        assets: {
            fonts: utils.getSourcePath('fonts/**/*.*'),
            images: utils.getSourcePath('images/**/*.*')
        },
        doc: {
           js: utils.getSourcePath('js', '**/*.js'),
           jsvendor: [
               utils.getPath('node_modules', 'jquery', 'dist', 'jquery.min.js'), 
               utils.getPath('node_modules', 'jquery', 'dist', 'jquery.min.map'),
               utils.getPath('node_modules', 'bootstrap-sass', 'assets', 'javascripts', 'bootstrap.min.js')
           ]
        },
        pages: {
            root: utils.getSourcePath('doc', '*.hbs'),
            partials: utils.getSourcePath('doc', 'partials', '**/*.hbs'),
            layouts: utils.getSourcePath('doc', 'layouts', 'default.hbs'),
            helpers: utils.getSourcePath('doc', 'handlebars-helpers', '*.js'),
            data: utils.getSourcePath('doc', 'data', '*.json'),
        }
    },
   
    target: {
       gruntroot: utils.getPath('dist'), // Temporary
       root: utils.getTargetPath(),
       styles: utils.getTargetPath('css'),
       assets: {
           fonts: utils.getTargetPath('fonts'),
           images: utils.getTargetPath('images') 
       },
       doc: {
           js: utils.getTargetPath('js'),
           jsvendor: utils.getTargetPath('js', 'vendor')
       },
       pages: utils.getTargetPath()
    }
}

module.exports = paths;