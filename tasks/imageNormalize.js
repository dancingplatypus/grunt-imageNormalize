
module.exports = function(grunt) {
  var path;
  path = require("path");
  grunt.registerMultiTask('imageNormalize', 'resize images to some set size', function() {
    var cb, count, dest, files, helpers, options;
    cb = this.async();
    helpers = require('grunt-contrib-lib').init(grunt);
    options = this.data.options;
    dest = this.file.dest;
    grunt.verbose.writeflags(options, 'Options');
    files = grunt.file.expandFiles(this.file.src);
    count = files.length;
    if (count === 0) {
      grunt.log.writeln("no files to process".red);
      cb();
      return true;
    }
    grunt.log.writeln(("processing " + count + " file(s)").cyan);
    files.forEach(function(fp) {
      grunt.log.write("resizing " + fp + " to " + (options.width + "x" + options.height).yellow + "...");
      return grunt.helper('norm-image', fp, dest, function() {
        count = count - 1;
        if (count === 0) {
          cb();
        }
      }, grunt.utils._.clone(options));
    });
    if (grunt.task.current.errorCount) {
      return false;
    } else {
      return true;
    }
  });
  return grunt.registerHelper('norm-image', function(src, destPath, callback, options) {
    var dest, dirname, fs, gm, stream;
    gm = require('gm');
    fs = require('fs');
    options = options || {};
    if (destPath && options.preserve_dirs) {
      dirname = path.dirname(src);
      if (options.base_path) {
        dirname = dirname.replace(new RegExp('^' + options.base_path), '');
      }
      destPath = path.join(destPath, dirname);
    } else if (!destPath) {
      destPath = path.dirname(src);
    }
    dest = path.join(destPath, path.basename(src));
    grunt.file.write(dest, "");
    stream = fs.createReadStream(src);
    return gm(stream).resize(options.width, options.height).gravity('Center').background('#000000FF').extent(options.width, options.height).write(dest, function(err) {
      if (!err) {
        grunt.log.writeln("Done!".green);
      } else {
        grunt.log.writeln("Error!".red);
        console.log(err);
        grunt.warn("unable to resize " + src);
      }
      callback();
    });
  });
};
