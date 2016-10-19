module.exports = function (grunt) {

    grunt.initConfig({
        
        lambda_invoke: {
            default: {
                options: {
                }
            }
        },
        lambda_deploy: {
            default: {
                options: {
                    enableVersioning: false,
                    region: "us-west-2"
                },
                arn: ''
            }
        },
        lambda_package: {
            default: {
            }
        }
    });

    grunt.loadNpmTasks('grunt-aws-lambda');
    grunt.registerTask('default', ['lambda_package', 'lambda_deploy']);
    grunt.registerTask('test', ['lambda_invoke']);
    //grunt.registerTask('default', ['lambda_invoke']);
};
