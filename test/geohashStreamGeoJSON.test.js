/** ****************************************************************************************************
 * File: geohashStreamGeoJSON.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai                     = require( 'chai' ),
	expect                   = chai.expect,
	{ readFileSync }         = require( 'fs' ),
	{ join }                 = require( 'path' ),
	{ GeohashStreamGeoJSON } = require( '../index' );

describe( '[geohash.GeohashStreamGeoJSON]', () => {
	it( 'should stream geohashes within a bbox in GeoJSON (should not include geohash as property or feature bbox)',
		done => {
			const
				geoStream = new GeohashStreamGeoJSON( {
					minLng: -158.53271484375,
					minLat: 22.169601410638865,
					maxLng: -157.69500732421875,
					maxLat: 22.740723091194727,
					precision: 5,
					includeGeohashAsProperty: false,
					includeFeatureBBox: false
				} ),
				tested    = [],
				results   = readFileSync( join( __dirname, './geohashStreamGeoJSON.test.results.json' ), 'utf8' );

			geoStream
				.on( 'data', d => tested.push( JSON.parse( d ) ) )
				.on( 'end', () => {
					const expected = JSON.parse( results );

					expected.forEach( ( item ) => {
						delete item.bbox;
						delete item.properties.geohash;
					} );

					expect( tested ).to.deep.eq( expected );
					done();
				} );
		}
	);

	it( 'should stream geohashes within a bbox in GeoJSON',
		done => {
			const
				geoStream = new GeohashStreamGeoJSON( {
					minLng: -158.53271484375,
					minLat: 22.169601410638865,
					maxLng: -157.69500732421875,
					maxLat: 22.740723091194727,
					precision: 5,
					includeGeohashAsProperty: true,
					includeFeatureBBox: true
				} ),
				tested    = [],
				expected  = readFileSync( join( __dirname, './geohashStreamGeoJSON.test.results.json' ), 'utf8' );

			geoStream
				.on( 'data', d => tested.push( JSON.parse( d ) ) )
				.on( 'end', () => {
					expect( tested ).to.deep.eq( JSON.parse( expected ) );
					done();
				} );
		}
	);
} );
