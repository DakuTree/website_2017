module.exports = function(grunt){
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/*----------------------------------( VERSIONING )----------------------------------*/

		now: grunt.template.today('yyyy/mm/dd @ HH:MM:ss'),

		/*----------------------------------( BOWER )----------------------------------*/

		bower: {
			install: {
				options: {
					targetDir: './files/vendor',  // A directory where you want to keep your Bower packages.
					cleanup: true,                // Will clean target and bower directories.
					layout: 'byComponent',        // Folder structure type.
					verbose: true,                // Debug output.
				},
			},
		},

		/*----------------------------------( RENAME )----------------------------------*/

		//Because bower doesn't allow you to rename files :<
		rename: {
			moveThat: {
				src:  './files/vendor/css/main.css',
				dest: './files/vendor/css/boilerplate.css'
			}
		},

		/*----------------------------------( WATCH )----------------------------------*/

		watch: {
			files: [
				'./files/main.less',
				'./files/main.js',
				'./files/templates/**/*',
				'./vendor/**/*'
			],
			tasks: ['default'],
		},

		/*----------------------------------( ENV )----------------------------------*/

		env: {
			dev: {
				NODE_ENV: 'DEVELOPMENT',
			},
			prod: {
				NODE_ENV: 'PRODUCTION',
			},
		},

		/*----------------------------------( CLEAN )----------------------------------*/

		clean: {
			options: {
				force: true, // Allows for deletion of folders outside current working dir (CWD). Use with caution.
			},
			dev: [
				'../dev/**/*'
			],
			prod: [
				'../prod/**/*'
			]
		},

		/*----------------------------------( LESS )----------------------------------*/

		less: {
			prod: {
				options: {
					cleancss: true,
					compress: true
				},
				files: {"../prod/assets/main.css": "files/main.less"} /* There should be some cache control here */
			}
		},

		/*----------------------------------( CSSMIN )----------------------------------*/

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: 14
			},
			prod: {
				files: [{
					expand: true,
					cwd: './files/vendor/css/',
					src: ['*.css', '!*.min.css'],
					dest: './files/vendor/css/',
					ext: '.min.css'
				}]
			}
		},

		/*----------------------------------(    UGLIFY  )----------------------------------*/
		uglify: {
			prod: {
				files: [
					{
						"../prod/assets/main.js" : "files/main.js"
					},
					{
						expand: true,
						cwd: 'files/vendor/js/',
						src: '*.js',
						dest: './files/vendor/js/',
						ext:  '.min.js'
					}
				]
			}
		},

		/*----------------------------------( PREPROCESS )----------------------------------*/

		preprocess: {
			options: {
				context: {
					description: '<%= pkg.description %>',
					homepage: '<%= pkg.homepage %>',
					license: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
					name: '<%= pkg.name %>',
					now: '<%= now %>',
					production: '<%= pkg.production %>',
					title: '<%= pkg.title %>',
					ver: '<%= ver %>',
					version: '<%= pkg.version %>',

					google_analytics_id: "UA-30896979-1"
				},
			},

			dev: {
				files: [
					{
						expand: true,
						cwd: './files/templates/',
						src: [
							'index.html',
							'!includes/**/*'
						],
						dest: '../dev/',
					},
				],
			},
			prod: {
				files: [
					{
						expand: true,
						cwd: './files/templates/',
						src: [
							'index.html',
							'!includes/**/*'
						],
						dest: '../prod/',
					}
				],
			},
		},

		/*----------------------------------( COPY )----------------------------------*/

		copy: {
			dev: {
				files: [
					{
						expand: true,
						cwd: './files/',
						src: [
							'img/*.*',
							'main.less',
							'main.js',
							'vendor/**/*.*',
							'!vendor/**/*.min.css'
						],
						dest: '../dev/assets/'
					},
					{
						expand: true,
						flatten: true,
						cwd: './files/',
						src: [
							'misc/*',
							'misc/.htaccess'
						],
						dest: '../dev/'
					}
				],
			},
			prod: {
				files: [
					{
						expand: true,
						cwd: './files/',
						src: [
							'img/*.*',
							'vendor/**/*.min.*'
							//'main.css' //main.css already exists in prod
						],
						dest: '../prod/assets/'
					},
					{
						expand: true,
						flatten: true,
						cwd: './files/',
						src: [
							'misc/*',
							'misc/.htaccess'
						],
						dest: '../prod/'
					}
				],
			},
		},

		/*----------------------------------( OPEN )----------------------------------*/
		open : {
			prod : {
				path : "http://codeanimu.net"
			}
		},
		/*----------------------------------( FTP )----------------------------------*/
		ftpush : {
			build : {
				auth : {
					host : "codeanimu.net",
					port : "21", //set via settings.json
					authKey : 'key'
				},
				src : '../prod/',
				dest : "/", //this is codeanimu.net/web-front/
				simple : true,
				exclusions : ['**.DS_Store']
			}
		},
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ftpush');
	grunt.loadNpmTasks('grunt-open');

	//----------------------------------

	/**
	 * @see https://github.com/onehealth/grunt-preprocess/issues/7
	 * @see https://github.com/onehealth/grunt-env/issues/4
	 */

	grunt.registerTask('printenv', function () { console.log(process.env); });

	//----------------------------------

	grunt.registerTask('init', []);
	grunt.registerTask('update', ['bower', 'rename']);

	grunt.registerTask('dev', ['init', 'env:dev', 'clean:dev', 'preprocess:dev', 'copy:dev']);
	grunt.registerTask('prod', ['dev', 'env:prod', 'clean:prod', 'less:prod', 'cssmin:prod', 'uglify:prod', 'preprocess:prod', 'copy:prod']);

	grunt.registerTask('deploy', ['prod', 'ftpush', 'open:prod']);
	grunt.registerTask('default', ['dev']);
};
