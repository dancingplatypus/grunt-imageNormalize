# grunt-image-normalize
> Normalize images to some predetermined height and width (https://github.com/dancingplatypus/grunt-imageNormalize).

### Overview

Inside your `grunt.js` file add a section named `imageNormalize`. This section specifies images to normalize and the size of those images.

#### Pre-requisites

You will need to have GraphicsMagick installed and available in your path

#### Parameters

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

##### options ```object```

This controls how this task (and its helpers) operate and should contain key:value pairs, see options below.

#### Options

##### height ```integer```

The height of the resulting image in pixels.  If the aspect ratio does not match, it will be padded with a transparent background

##### width ```integer```

The width of the resulting image in pixels.  If the aspect ratio does not match, it will be padded with a transparent background

##### preserveDirectories ```boolean```

If this is false, then any files found in the sources will be flattened.  Files of the same name will clobber one another

##### base_path ```string```

The offset into the source directory to use when preserving directories

#### Config Example

``` javascript
imageNormalize: {
  target: {
    options: {
      height: 640,
      width: 640,
      preserveDirectories: true,
      baseDirectory: "src"
    },
    src: [
        "src/images/**/*.png": "
    ],
    dest: "public/images"
  }
}
```