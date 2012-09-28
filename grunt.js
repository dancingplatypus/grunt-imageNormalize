module.exports = function(grunt) {

    grunt.initConfig({
        clean: { build: ["lib/"], test: ["test_output/"] },

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
            test: {
                src: ['test/**/*.png'],
                dest: 'test_output/',
                options: {
                    height: 128,
                    width: 128,
                    preserve_dirs: true,
                    base_path: 'test'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-coffee');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load local tasks.
    grunt.loadTasks('tasks');

    grunt.registerTask('default', "clean:build coffee");

    // I solemnly swear to learn how to write test code for javascript and grunt
    grunt.registerTask('test', "default clean:test imageNormalize:test");

}