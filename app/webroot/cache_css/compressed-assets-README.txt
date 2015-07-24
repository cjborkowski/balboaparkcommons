The css and js files are being made with the Assest_Compress plugin
see https://github.com/markstory/asset_compress/wiki/Shell

The files are built using the following cake commands
navigate to your cakePHP installation 
# cd cake/console
First clear out old files
# ./cake asset_compress.asset_compress clear
Then build new ones
# ./cake asset_compress.asset_compress build_ini

The files are built according to the app/config/asset_compress.ini file
Additionally the JsMinFilter and CSSMin php libraries are used to minifiy the files.

The plugin has additional filter support such as:

Javascript
JsMinFilter connects with the JSMin. You should put JSMin in vendors/jsmin/jsmin.php by default. You can use the path config option to choose an alternate path. Like all output filters, JsMin will not be applied when debug > 0
YuiJs connects with YUI compressor. The jar file for yuicompressor, should be in vendors/yuicompressor/yuicompressor.jar by default. You can use the path option to define a different path. Like all output filters, YuiJs will not be applied when debug > 0
Sprockets Provides a pre processing step that inlines dependencies using special comments. Comments of //= require <file> or //= require "file" are replaced with the contents of the required file. Includes done with "" imply that the file is in the same directory as the current file, whereas files included with <> imply that AssetCompress should search all the defined javascript paths for the file.
Uglifyjs Uses uglify-js to minify javascript. Requires nodejs and uglify-js to be installed on your system. Like all output filters, UglifyJs will not be applied when debug > 0
CoffeeScript Integrates with coffee-script allowing you to easily write code in coffeescript. Requires both nodejs and coffee-script to be installed on your system.

CSS
CssMinFilter connects with CssMin. The CSSMin library should be placed in vendors/cssmin/CssMin.php by default. You can configure this using the path option. Like all output filters, CSSMin will not be applied when debug > 0.
YuiCss connects with YUI compressor. The jar file for yuicompressor, should be in vendors/yuicompressor/yuicompressor.jar by default. You can use the path option to define a different path. Like all output filters, YuiCSS will not be applied when debug > 0
LessCSS connects with LessCSS, allowing you to write css with LESS. Requires nodejs and less to be installed on your system.
ScssFilter connects with Sass, allowing you to use sass, and scss in your CSS files. Requires Ruby and the sass gem to be installed.

