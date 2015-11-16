/* global __dirname */
var path = require('path');

var paths = {
    sourcePath: 'src',
    destinationPath: 'dist'    
}

function getPath() {
    
    var fullPath = __dirname;
    
    for (var i = 0; i < arguments.length; i++) {
        fullPath = path.join(fullPath, arguments[i]);
    }
    return fullPath;
}

function getSourcePath() {
    
     var fullPath = path.join(__dirname, paths.sourcePath);
    
    for (var i = 0; i < arguments.length; i++) {
        fullPath = path.join(fullPath, arguments[i]);
    }
    return fullPath;
}

function getTargetPath() {
    
    var fullPath = path.join(__dirname, paths.destinationPath);
    
    for (var i = 0; i < arguments.length; i++) {
        fullPath = path.join(fullPath, arguments[i]);
    }
    return fullPath;
}

module.exports =  {
	paths: paths,
	getPath: getPath,
	getSourcePath: getSourcePath,
	getTargetPath: getTargetPath
};