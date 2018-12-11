# @parellin/geohash

Geohash decode/encoder

[![NPM](https://nodei.co/npm/@parellin/geohash.png?downloads=true&stars=true&downloadRank=true)](https://www.npmjs.com/package/@parellin/lightmap)

### Installation

`npm i @parellin/geohash`

### Usage

**Basic usage:**
```
const Geohash = require( '@parellin/geohash' );

const geohash = Geohash.encode( 52.205, 0.119, 7 ); // geohash: 'u120fxw'
```

### `encode`

Encodes latitude/longitude to geohash, either to specified precision or to automatically evaluated precision.

**params**
- `lat` {number} Latitude in degrees.
- `lon` {number} Longitude in degrees.
- `precision` {number} Number of characters in resulting geohash.

**returns**: Geohash of supplied latitude/longitude.

```javascript
const geohash = Geohash.encode( 52.205, 0.119, 7 ); // geohash: 'u120fxw'
```

### `decode`

Decode geohash to latitude/longitude (location is approximate centre of geohash cell, to reasonable precision).
	 
**params**
- `geohash` {string} Geohash string to be converted to latitude/longitude.

**returns**: (Center of) geohashed location.

```javascript
const latlon = Geohash.decode( 'u120fxw' ); // latlon: { lat: 52.205, lon: 0.1188 }
```

### `neighbors`

Returns all 8 adjacent cells to specified geohash.

**params**
- `geohash` {string} Geohash neighbors are required of.

**returns**: surrounding geohashes

```javascript
const latlon = Geohash.neighbors( 'u120fxw' );
// {
// 		nw: 'dqcjpxetzh6p',
// 		n: 'dqcjpxetzh6r',
// 		ne: 'dqcjpxetzh6x',
// 		w: 'dqcjpxetzh6n',
// 		c: 'dqcjpxetzh6q',
// 		e: 'dqcjpxetzh6w',
// 		sw: 'dqcjpxetzh6j',
// 		s: 'dqcjpxetzh6m',
// 		se: 'dqcjpxetzh6t'
// }
```

Example:

`Geohash.neighbors( 'dqcjpxetzh6q' );`

```
           ┬────────────────────────────────────────────────────┐
           │      'west'          'center'         'east'       │
┼──────────┼────────────────────────────────────────────────────┤
│ 'north'  │   'dqcjpxetzh6p'  'dqcjpxetzh6r'  'dqcjpxetzh6x'   │
│ 'center' │   'dqcjpxetzh6n'  'dqcjpxetzh6q'  'dqcjpxetzh6w'   │
│ 'south'  │   'dqcjpxetzh6j'  'dqcjpxetzh6m'  'dqcjpxetzh6t'   │
┴──────────┴────────────────────────────────────────────────────┘
```
