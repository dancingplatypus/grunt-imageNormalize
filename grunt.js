module.exports = function(grunt) {

    grunt.initConfig({
        clean: { build: ["lib/"], test: ["test_output/"] },

        copy: {
            test: { files: {
                "test_output/" : "test/**"
            }, options: { basePath: "test" }}
        },

        coffee: {
            tasks: {
                src: ['src/**/*.coffee'],
                dest: 'tasks',
                options: {
                    bare: true,
                    preserve_dirs: true,
                    base_path: "src"
                }
            }
        },

        imageNormalize: {
            test_small: {
                src: ['test_output/**/*-s.png'],
                dest: 'test_output/',
                options: {
                    height: 128,
                    width: 128,
                    preserve_dirs: true,
                    base_path: 'test_output'
                }
            },
            test_med: {
                src: ['test_output/**/*-m.png'],
                dest: 'test_output/',
                options: {
                    height: 256,
                    width: 256,
                    preserve_dirs: true,
                    base_path: 'test'
                }
            },
            test_large: {
                src: ['test_output/**/*-l.png'],
                dest: 'test_output/',
                options: {
                    height: 512,
                    width: 512,
                    preserve_dirs: true,
                    base_path: 'test'
                }
            }


        }

    });

    grunt.loadNpmTasks('grunt-coffee');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Load local tasks.
    grunt.loadTasks('tasks');

    grunt.registerTask('default', "clean:build coffee");

    // I solemnly swear to learn how to write test code for javascript and grunt
    grunt.registerTask('test', "default clean:test copy imageNormalize");

}