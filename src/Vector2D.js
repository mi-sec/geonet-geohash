/** ****************************************************************************************************
 * @file: Vector2D.js
 * Project: geohash
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Dec-2018
 *******************************************************************************************************/
'use strict';

class Vector2D
{
	constructor( x, y )
	{
		this.x = +x;
		this.y = +y;
	}

	toString()
	{
		return `(${ this.x }, ${ this.y })`;
	}

	toArray()
	{
		return [ this.x, this.y ];
	}

	toJSON()
	{
		return { x: this.x, y: this.y };
	}

	equals( vec )
	{
		return Vector2D.equals( this, vec );
	}

	static equals( vec1, vec2 )
	{
		return vec1.x === vec2.x && vec1.y === vec2.y;
	}

	add( vec )
	{
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}

	static add( vec1, vec2 )
	{
		return new Vector2D( vec1.x + vec2.x, vec1.y + vec2.y );
	}

	subtract( vec )
	{
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	}

	static subtract( vec1, vec2 )
	{
		return new Vector2D( vec1.x - vec2.x, vec1.y - vec2.y );
	}

	multiply( vec )
	{
		this.x *= vec.x;
		this.y *= vec.y;
		return this;
	}

	static multiply( vec1, vec2 )
	{
		return new Vector2D( vec1.x * vec2.x, vec1.y * vec2.y );
	}

	divide( vec )
	{
		this.x /= vec.x;
		this.y /= vec.y;
		return this;
	}

	static divide( vec1, vec2 )
	{
		return new Vector2D( vec1.x / vec2.x, vec1.y / vec2.y );
	}

	multiplyScalar( n )
	{
		this.x *= n;
		this.y *= n;
		return this;
	}

	static multiplyScalar( vec, n )
	{
		return new Vector2D( vec.x * n, vec.y * n );
	}

	divideScalar( n )
	{
		this.x /= n;
		this.y /= n;
		return this;
	}

	static divideScalar( vec, n )
	{
		return new Vector2D( vec.x / n, vec.y / n );
	}

	magnitude()
	{
		return Vector2D.magnitude( this );
	}

	static magnitude( vec )
	{
		return Math.sqrt( ( vec.x * vec.x ) + ( vec.y * vec.y ) );
	}

	normalize()
	{
		return Vector2D.normalize( this );
	}

	static normalize( vec )
	{
		return Vector2D.divideScalar( vec, Vector2D.magnitude( vec ) );
	}

	length()
	{
		return Vector2D.length( this );
	}

	static length( vec )
	{
		return Vector2D.magnitude( vec );
	}

	lengthSquared()
	{
		return Vector2D.lengthSquared( this );
	}

	static lengthSquared( vec )
	{
		return ( vec.x * vec.x ) + ( vec.y * vec.y );
	}

	zero()
	{
		this.x = this.y = 0;
		return this;
	}

	static zero()
	{
		return new Vector2D( 0, 0 );
	}

	static up()
	{
		return new Vector2D( 0, 1 );
	}

	static right()
	{
		return new Vector2D( 1, 0 );
	}

	static down()
	{
		return new Vector2D( 0, -1 );
	}

	static left()
	{
		return new Vector2D( -1, 0 );
	}

	dot( vec )
	{
		return Vector2D.dot( this, vec );
	}

	static dot( vec1, vec2 )
	{
		return ( vec1.x * vec2.x ) + ( vec1.y * vec2.y );
	}

	cross( vec )
	{
		return Vector2D.cross( this, vec );
	}

	static cross( vec1, vec2 )
	{
		return ( vec1.x * vec2.x ) - ( vec1.y * vec2.y );
	}

	reverse()
	{
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	static reverse( vec )
	{
		return new Vector2D( -vec.x, -vec.y );
	}

	distance( vec )
	{
		return Vector2D.distance( this, vec );
	}

	static distance( vec1, vec2 )
	{
		return Math.hypot( vec1.x - vec2.x, vec1.y - vec2.y );
	}

	round( n )
	{
		return Vector2D.round( this, n );
	}

	static round( vec, n )
	{
		n     = 10 ** ( n === 0 ? n : n || 6 );
		vec.x = ( ( 0.5 + ( vec.x * n ) ) << 0 ) / n;
		vec.y = ( ( 0.5 + ( vec.y * n ) ) << 0 ) / n;
		return vec;
	}

	rotateRadians( rads, round = 6 )
	{
		return Vector2D.rotateRadians( this, rads, round );
	}

	static rotateRadians( vec, rads, round = 6 )
	{
		const [ cos, sin, x, y ] = [ Math.cos( rads ), Math.sin( rads ), vec.x, vec.y ];

		vec.x = cos * x - sin * y;
		vec.y = sin * x + cos * y;
		return Vector2D.round( vec, round );
	}

	rotateDegrees( degs, round = 6 )
	{
		return this.rotateRadians( degs * Vector2D.DegToRad, round );
	}

	static rotateDegrees( vec, degs, round = 6 )
	{
		return Vector2D.rotateRadians( degs * Vector2D.DegToRad, round );
	}

	clone()
	{
		return new Vector2D( this.x, this.y );
	}
}

Vector2D.DegToRad = Math.PI / 180;
Vector2D.RadToDeg = 180 / Math.PI;

// console.log( 'toString       ', new Vector2D( 2, 3 ).toString() );
// console.log( 'toArray        ', new Vector2D( 2, 3 ).toArray() );
// console.log( 'toJSON         ', new Vector2D( 2, 3 ).toJSON() );
// console.log( 'equals         ', new Vector2D( 0, 0 ).equals( new Vector2D( 0, 0 ) ) );
// console.log( 'add            ', new Vector2D( 0, 0 ).add( new Vector2D( 1, 1 ) ) );
// console.log( 'subtract       ', new Vector2D( 0, 0 ).subtract( new Vector2D( 1, 1 ) ) );
// console.log( 'multiply       ', new Vector2D( 0, 0 ).multiply( new Vector2D( 1, 1 ) ) );
// console.log( 'divide         ', new Vector2D( 0, 0 ).divide( new Vector2D( 1, 1 ) ) );
// console.log( 'multiplyScalar ', new Vector2D( 1, 1 ).multiplyScalar( 2 ) );
// console.log( 'divideScalar   ', new Vector2D( 1, 1 ).divideScalar( 2 ) );
// console.log( 'magnitude      ', new Vector2D( 1, 1 ).magnitude() );
// console.log( 'normalize      ', new Vector2D( 1, 1 ).normalize() );
// console.log( 'length         ', new Vector2D( 1, 1 ).length() );
// console.log( 'lengthSquared  ', new Vector2D( 1, 1 ).lengthSquared() );
// console.log( 'zero           ', new Vector2D( 1, 1 ).zero() );
// console.log( 'up             ', Vector2D.up() );
// console.log( 'down           ', Vector2D.down() );
// console.log( 'right          ', Vector2D.right() );
// console.log( 'left           ', Vector2D.left() );
// console.log( 'dot            ', new Vector2D( 1, 1 ).dot( new Vector2D( 2, 2 ) ) );
// console.log( 'cross          ', new Vector2D( 1, 1 ).cross( new Vector2D( 0, 2 ) ) );
// console.log( 'reverse        ', new Vector2D( 1, 1 ).reverse() );
// console.log( 'distance       ', new Vector2D( 0, 0 ).distance( new Vector2D( 2, 2 ) ) );
// console.log( 'round          ', new Vector2D( 1.005, 1.005 ).round( 3 ) );
// console.log( 'rotateRadians  ', new Vector2D( 1, 1 ).rotateRadians( Math.PI, 0 ) );
// console.log( 'rotateDegrees  ', new Vector2D( 1, 1 ).rotateDegrees( 180, 5 ) );

module.exports = Vector2D;
