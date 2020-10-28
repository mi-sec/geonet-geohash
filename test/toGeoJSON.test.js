/** ****************************************************************************************************
 * File: toGeoJSON.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 28-Oct-2020
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const { toGeoJSON } = require( '../index' );

describe( '[geohash.toGeoJSON]', () => {
	it( 'should convert geohash to GeoJSON feature (precision 1, should includeGeohashAsProperty and includeFeatureBBox)',
		() => {
			const
				expected = {
					type: 'Feature',
					properties: { geohash: 'd' },
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[ -90, 0 ],
								[ -45, 0 ],
								[ -45, 45 ],
								[ -90, 45 ],
								[ -90, 0 ]
							]
						]
					},
					bbox: [ -90, 0, -45, 45 ]
				},
				actual   = toGeoJSON( 'd', {
					includeGeohashAsProperty: true,
					includeFeatureBBox: true
				} );

			expect( actual ).to.deep.eq( expected );
		}
	);

	it( 'should convert geohash to GeoJSON feature (precision 2)',
		() => {
			const
				expected = {
					type: 'Feature',
					properties: { geohash: 'dq' },
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[ -78.75, 33.75 ],
								[ -67.5, 33.75 ],
								[ -67.5, 39.375 ],
								[ -78.75, 39.375 ],
								[ -78.75, 33.75 ]
							]
						]
					}
				},
				actual   = toGeoJSON( 'dq', {
					includeGeohashAsProperty: true
				} );

			expect( actual ).to.deep.eq( expected );
		}
	);

	it( 'should convert geohash to GeoJSON feature (precision 3)',
		() => {
			const
				expected = {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[ -77.34375, 37.96875 ],
								[ -75.9375, 37.96875 ],
								[ -75.9375, 39.375 ],
								[ -77.34375, 39.375 ],
								[ -77.34375, 37.96875 ]
							]
						]
					}
				},
				actual   = toGeoJSON( 'dqc' );

			expect( actual ).to.deep.eq( expected );
		}
	);

	it( 'should convert geohash to GeoJSON feature (precision 12)',
		() => {
			const
				expected = {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[ -77.0090502128005, 38.88986583799124 ],
								[ -77.00904987752438, 38.88986583799124 ],
								[ -77.00904987752438, 38.8898660056293 ],
								[ -77.0090502128005, 38.8898660056293 ],
								[ -77.0090502128005, 38.88986583799124 ]
							]
						]
					}
				},
				actual   = toGeoJSON( 'dqcjpxetzh6q' );

			expect( actual ).to.deep.eq( expected );
		}
	);
} );
