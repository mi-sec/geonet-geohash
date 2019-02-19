/** ****************************************************************************************************
 * File: geohashStream.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Feb-2019
 *******************************************************************************************************/
'use strict';

const
	chai              = require( 'chai' ),
	expect            = chai.expect,
	{ GeohashStream } = require( '../index' );

describe( '[geohash.GeohashStream]', () => {
	it( 'should stream geohashes within a bbox',
		done => {
			const
				bbox      = [
					0.10967016220092772,
					52.201334010450125,
					0.12112855911254883,
					52.20717274359796
				],
				geoStream = new GeohashStream( ...bbox, 7 ),
				result    = [],
				expected  = [
					'u120fqz', 'u120fwb', 'u120fwc', 'u120fwf', 'u120fwg', 'u120fwu', 'u120fwv', 'u120fwy', 'u120fwz',
					'u120fyb', 'u120frp', 'u120fx0', 'u120fx1', 'u120fx4', 'u120fx5', 'u120fxh', 'u120fxj', 'u120fxn',
					'u120fxp', 'u120fz0', 'u120frr', 'u120fx2', 'u120fx3', 'u120fx6', 'u120fx7', 'u120fxk', 'u120fxm',
					'u120fxq', 'u120fxr', 'u120fz2', 'u120frx', 'u120fx8', 'u120fx9', 'u120fxd', 'u120fxe', 'u120fxs',
					'u120fxt', 'u120fxw', 'u120fxx', 'u120fz8', 'u120frz', 'u120fxb', 'u120fxc', 'u120fxf', 'u120fxg',
					'u120fxu', 'u120fxv', 'u120fxy', 'u120fxz', 'u120fzb', 'u12142p', 'u121480', 'u121481', 'u121484',
					'u121485', 'u12148h', 'u12148j', 'u12148n', 'u12148p', 'u1214b0'
				];
			
			geoStream
				.on( 'data', d => result.push( d.toString() ) )
				.on( 'end', () => {
					expect( result ).to.deep.eq( expected );
					done();
				} );
		}
	);
} );
