module.exports = (grunt) ->

  grunt.registerMultiTask 'imageNormalize', 'resize images to some set size', ->
    console.log @target
    return