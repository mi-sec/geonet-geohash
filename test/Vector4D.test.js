/** ****************************************************************************************************
 * File: Vector4D.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 12-Dec-2018
 *******************************************************************************************************/
'use strict';

const
	chai     = require( 'chai' ),
	expect   = chai.expect,
	Vector4D = require( '../src/Vector4D' );

describe( 'Vector4D', () => {
	it( '[Vector4D.matchString] should get array of numbers',
		() => {
			const
				expected1 = Vector4D.matchString( '-77.480264,38.848498,-77.453227,38.866812' ),
				expected2 = Vector4D.matchString( '-77.48,38.84,-77.45,38.86' ),
				expected3 = Vector4D.matchString( '-77.4,38.8,-77.4,38.8' ),
				expected4 = Vector4D.matchString( '-77,38,-77,38' ),
				expected5 = Vector4D.matchString( '-7,3,-7,3' ),
				expected6 = Vector4D.matchString( '-0,0,-0,0' ),
				actual1   = [ -77.480264, 38.848498, -77.453227, 38.866812 ],
				actual2   = [ -77.48, 38.84, -77.45, 38.86 ],
				actual3   = [ -77.4, 38.8, -77.4, 38.8 ],
				actual4   = [ -77, 38, -77, 38 ],
				actual5   = [ -7, 3, -7, 3 ],
				actual6   = [ -0, 0, -0, 0 ];
			
			expect( expected1 ).to.deep.eq( actual1 );
			expect( expected2 ).to.deep.eq( actual2 );
			expect( expected3 ).to.deep.eq( actual3 );
			expect( expected4 ).to.deep.eq( actual4 );
			expect( expected5 ).to.deep.eq( actual5 );
			expect( expected6 ).to.deep.eq( actual6 );
		}
	);
} );
