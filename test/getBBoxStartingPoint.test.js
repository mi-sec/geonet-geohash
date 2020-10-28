/** ****************************************************************************************************
 * File: getBBoxStartingPoint.test.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 28-Oct-2020
 *******************************************************************************************************/
'use strict';

const
	chai   = require( 'chai' ),
	expect = chai.expect;

const
	{ getBBoxStartingPoint } = require( '../index' );

describe( '[geohash.getBBoxStartingPoint]', () => {
	it( 'should return latStep/lngStep and hashSouthWest (should select ENCODE_AUTO as default precision; precision expected to max at 12)',
		() => {
			const
				expected = { latStep: 3406874, lngStep: 2498560, hashSouthWest: '87zq0eb5210p' },
				extent   = [ -158.53271484375, 22.169601410638865, -157.69500732421875, 22.740723091194727 ],
				tested   = getBBoxStartingPoint( ...extent );

			expect( tested ).to.deep.eq( expected );
		}
	);

	it( 'should return latStep/lngStep and hashSouthWest (should select ENCODE_AUTO as default precision; precision expected to assume 5)',
		() => {
			const
				expected = { latStep: 14, lngStep: 20, hashSouthWest: '87zm9' },
				extent   = [ -158.5, 22.1, -157.6, 22.7 ],
				tested   = getBBoxStartingPoint( ...extent );

			expect( tested ).to.deep.eq( expected );
		}
	);

	it( 'should return latStep/lngStep and hashSouthWest (precision set to 4, assumed 12)',
		() => {
			const
				expected = { latStep: 3, lngStep: 2, hashSouthWest: '87zq' },
				extent   = [ -158.53271484375, 22.169601410638865, -157.69500732421875, 22.740723091194727 ],
				tested   = getBBoxStartingPoint( ...extent, 4 );

			expect( tested ).to.deep.eq( expected );
		}
	);

	it( 'should return latStep/lngStep and hashSouthWest (precision set to 4, assumed 5)',
		() => {
			const
				expected = { latStep: 4, lngStep: 2, hashSouthWest: '87zm' },
				extent   = [ -158.5, 22.1, -157.6, 22.7 ],
				tested   = getBBoxStartingPoint( ...extent, 4 );

			expect( tested ).to.deep.eq( expected );
		}
	);
} );
