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
	it( 'should stream geohashes within a bbox in GeoJSON',
		done => {
			const
				bbox      = [
					0.10967016220092772,
					52.201334010450125,
					0.12112855911254883,
					52.20717274359796
				],
				geoStream = new GeohashStreamGeoJSON( ...bbox, 7 ),
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
