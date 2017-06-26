# Basic Webpack Config
This is a basic working webpack example using the following:

* [yarn](https://github.com/yarnpkg/yarn) to manage dependencies (acts almost identically to npm, with added benefits).
* JS linting with [eslint](http://eslint.org/), using the eslint config file that is maintained here - [`/config-files/.eslintrc`](/config-files/.eslintrc). For more info on our JS standards, please go to the [`/coding-standards`](/coding-standards) section.
* SCSS linting with [stylelint](https://github.com/stylelint/stylelint), using the stylelint config file that is maintained here - [`/config-files/.stylelint`](/config-files/.stylelint). For more info on our SCSS standards, please go to the [`/coding-standards`](/coding-standards) section.
* [babel](https://babeljs.io/) to transpile our es6, using the babel config file that is maintained here - [`/config-files/.babelrc`](/config-files/.babelrc)
* [postCSS](https://github.com/postcss/postcss) to process our SCSS with polyfills, plugins, etc.

## High-Level Notes
* All styles are output into CSS files using [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin). This can be deactivated to handle all styling through js (may be relevant for modern FE frameworks like React of Angular)
* [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) is used to pull out common repeated blocks of code into a single common.js file.
* Source files are compiled and built as required, starting from the entry point(s) set up in the config file.
* All postcss plugins can be added directly into the webpack config. cssnext and reporter plugins included by default. Polyfills can be added here as well.

## Running
**Note: `.babelrc`, `.eslintrc`, and `.stylelintrc` all extend from their respective files in `/config-files` to maintain one master copy in this repository. If pulling down this example, make sure to replace those extends with the master copies in [`/config-files`](/config-files)**

**Note: `.babelrc` requires plugins to be installed in the same directory as the file. If you're going to be using this folder to run this example, please make sure to go into `/config-files` and run an `npm install`. This will not be necessary in production when you replace the config files in this folder with the ones in `/config-files`**


* `brew install yarn` - install yarn. for other installation methods, [go here](https://yarnpkg.com/lang/en/docs/install/).
* `yarn install` - installs all packages
* `yarn dev` - runs and watches with webpack. lints re-run on every save.
* `yarn prod` - builds out to `/dist` for prod.
