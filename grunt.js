module.exports = function(grunt) {

    grunt.initConfig({
        clean: { build: ["lib/"] },

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
        }


    });

    grunt.loadNpmTasks('grunt-coffee');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load local tasks.
    grunt.loadTasks('tasks');

    grunt.registerTask('default', "clean coffee");

}