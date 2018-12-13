'use strict';

const
	Geohash = require( '../index' );


for( let i = 0; i < 100000; i++ ) {
	process.stdout.write( '-' );
	Geohash.neighbors( 'dqcjpxetzh6q' );
}

process.stdout.write( '\n' );

console.log( Geohash.neighbors( 'dqcjpxetzh6q' ) );
