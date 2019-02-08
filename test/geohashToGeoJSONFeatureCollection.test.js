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
	{ featureCollection } = require( '@turf/helpers' ),
	{
		geohashesWithinBBox,
		toGeoJSON
	}                     = require( '../index' );

describe( '@parellin/geohash - geohashToGeoJSONFeatureCollection', () => {
	it( '[geohashesWithinBBox] should return Geohashes inside a bbox',
		done => {
			const
				result = readFileSync(
					join( __dirname, './geohashToGeoJSONFeatureCollection.test.result.json' ),
					'utf8'
				),
				extent = [ -158.53271484375, 22.169601410638865, -157.69500732421875, 22.740723091194727 ],
				tested = geohashesWithinBBox( ...extent, 5 ).map( toGeoJSON );
			
			expect( featureCollection( tested ) ).to.deep.eq( JSON.parse( result ) );
			
			done();
		}
	);
} );
