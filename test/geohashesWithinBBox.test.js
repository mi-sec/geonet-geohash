/** ****************************************************************************************************
 * File: geohashesWithinBBox.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 07-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{ readFileSync } = require( 'fs' ),
	{ join }         = require( 'path' ),
	chai             = require( 'chai' ),
	expect           = chai.expect;

const { geohashesWithinBBox } = require( '../index' );

describe( '@parellin/geohash - geohashesWithinBBox', () => {
	it( '[geohashesWithinBBox] should return Geohashes inside a bbox',
		done => {
			let result = readFileSync( join( __dirname, './geohashesWithinBBox.test.result.json' ), 'utf8' );
			result     = JSON.parse( result );
			
			const
				extent = [ -158.53271484375, 22.169601410638865, -157.69500732421875, 22.740723091194727 ],
				tested = geohashesWithinBBox( ...extent, 5 );
			
			expect( tested ).to.deep.eq( result );
			
			done();
		}
	);
} );

