'use strict';

/*
* Required modules
*/
const fs = require( "fs" );
const path = require( "path" );

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'DSWR Component Library');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/patterns');

/* Tell the Fractal web preview plugin where to look for static assets. */
fractal.web.set( "static.path", path.join( __dirname, "/src/public" ) );

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/*
 * Default preview
 */
fractal.components.set( "default.preview", "@preview" );

/*
 * Handlebars configuration
 */
const hbs = require( "@frctl/handlebars" )( {
  helpers: {
      // Custom handler: inline any file from the static assets path
      inline: function( src ) {
          var content = fs.readFileSync( fractal.web.get( "static.path" ) + src, "utf8" );

          return content;
      }
  }
} );

/* set as the default template engine for components */
fractal.components.engine( hbs );