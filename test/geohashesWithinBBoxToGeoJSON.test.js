/** ****************************************************************************************************
 * File: geohashToGeoJSONFeatureCollection.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	{ readFileSync } = require( 'fs' ),
	{ join }         = require( 'path' ),
	chai             = require( 'chai' ),
	expect           = chai.expect;

const
	{ geohashesWithinBBoxToGeoJSON } = require( '../index' );

describe( '[geohash.geohashesWithinBBoxToGeoJSON]', () => {
	it( 'should return GeoJSON of geohashes within a bbox',
		done => {
			const
				expected = readFileSync(
					join( __dirname, './geohashesWithinBBoxToGeoJSON.test.results.json' ),
					'utf8'
				),
				extent   = [ -158.53271484375, 22.169601410638865, -157.69500732421875, 22.740723091194727 ],
				tested   = geohashesWithinBBoxToGeoJSON( ...extent, 5 );
			
			expect( tested ).to.deep.eq( JSON.parse( expected ) );
			
			done();
		}
	);
} );
