module.exports = (grunt) ->

  path = require "path"

  grunt.registerMultiTask 'imageNormalize', 'resize images to some set size', ->

    cb = @async()

    helpers = require('grunt-contrib-lib').init grunt
    options = @data.options
    dest = @file.dest

    grunt.verbose.writeflags options, 'Options'

    files = grunt.file.expandFiles @file.src
    count = files.length

    if count == 0
      grunt.log.writeln "no files to process".red
      cb()
      return true

    grunt.log.writeln ("processing " + count + " file(s)").cyan

    files.forEach (fp) ->

      grunt.log.writeln "resizing " + fp + " to " + (options.width + "x" + options.height).yellow + "..."
      grunt.helper 'norm-image', fp, dest,
        () ->
            count = count - 1
            if count == 0 then cb()
            return
        ,
        grunt.utils._.clone(options)

    if grunt.task.current.errorCount
      false
    else
      true


  grunt.registerHelper 'norm-image', (src, destPath, callback, options) ->

    gm = require 'gm'
    fs = require 'fs'
    options = options || {}

    if destPath && options.preserve_dirs

      dirname = path.dirname src
      if options.base_path
        dirname = dirname.replace new RegExp('^'+options.base_path), ''

      destPath = path.join destPath, dirname

    else if !destPath
      destPath = path.dirname src

    dest = path.join destPath, path.basename(src)

    # this makes sure the directory structure is built
    grunt.file.write dest, ""

    # use a stream so that we can modify an image in place, otherwise
    # gm is going to clobber it
    stream = fs.createReadStream src

    gm(stream)
      .resize(options.width, options.height)
      .gravity('Center')
      .background('#000000FF')
      .extent(options.width, options.height)
      .write(dest, (err) ->
        if !err
          grunt.log.writeln ("resized " + src + " to ").green + (options.width + "x" + options.height).yellow
        else
          grunt.log.writeln ("Error resizing " + src).red
          console.log err
          grunt.warn "unable to resize " + src
        callback()
        return
      )

