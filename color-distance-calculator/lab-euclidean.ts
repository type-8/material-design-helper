type RGB = [number, number, number];
const WHITE_RELATIVE_RGB: RGB = [1, 1, 1];
const BLACK_RELATIVE_RGB: RGB = [0, 0, 0];


/** @value 0.20689655172413793 */
const n6d29 = 6 / 29;

/** @value 0.04280618311533888 */
const n6d29p2 = n6d29 * n6d29;

/** @value 0.008856451679035631 */
const n6d29p3 = n6d29p2 * n6d29;

/** @value 23.361111111111107 */
const n29d6 = Math.pow(29 / 6, 2);

/** @value 0.13793103448275862 */
const n4d29 = 4 / 29;

/** @value 0.3333333333333333 */
const n1d3 = 1 / 3;


function getX(r: number, g: number, b: number): number {
  return 0.4124 * r + 0.3576 * g + 0.1805 * b;
}

function getY(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getZ(r: number, g: number, b: number): number {
  return (0.0193 * r) + (0.1192 * g) + (0.9505 * b);
}

function rgb2xyz([r, g, b]: RGB): RGB {
  return [getX(r, g, b), getY(r, g, b), getZ(r, b, b)];
}


function calcTriangle(t: number): number {
  return (t > n6d29p3)
    ? Math.pow(t, n1d3)
    : n1d3 * n29d6 * t + n4d29;
}

const WHITE_DIFFERENCE = rgb2xyz(WHITE_RELATIVE_RGB);
const xyz2lab = (xyz: RGB): RGB => {
// function xyz2lab(xyz: RGB): RGB {
  const wd = WHITE_DIFFERENCE;
  const xxn = calcTriangle(xyz[0] / wd[0]);
  const yyn = calcTriangle(xyz[1] / wd[1]);
  const zzn = calcTriangle(xyz[2] / wd[2]);

  return [
    116 * yyn - 16,
    500 * (xxn - yyn),
    200 * (yyn - zzn)
  ]
};

function rgb2lab(rgb: RGB): RGB {
  return xyz2lab(rgb2xyz(rgb));
}


// function lab2xyz([l, a, b]: RGB): RGB {
//   const y = (l + 16 ) / 116;
//   const x = y + a / 500;
//   const z = y - b / 200;
//   const wd = WHITE_DIFFERENCE;

//   return [
//     x > n6d29
//       ? wd[0] * x * x * x
//       : (x - n16d116) * 3 * n6d29p2 * wd[0],
//     y > n6d29
//       ? wd[1] * y * y * y
//       : (y - n16d116) * 3 * n6d29p2 * wd[1],
//     x > n6d29
//       ? wd[2] * z * z * z
//       : (z - n16d116) * 3 * n6d29p2 * wd[2]
//   ];
// }
// function lab2rgb(lab: RGB): RGB {
//   return xyz2rgb(lab2xyz(lab));
// }


function calcDifference(src: RGB, dest: RGB) {
  src = rgb2lab(src);
  dest = rgb2lab(dest);

  const x = src[0] - dest[0];
  const y = src[1] - dest[1];
  const z = src[2] - dest[2];

  return Math.sqrt(x * x + y * y + z * z);
}

/** @value 100.0 */
const MAX_DIFFERENCE = calcDifference(WHITE_RELATIVE_RGB, BLACK_RELATIVE_RGB);
function calcDistance(src: RGB, dest: RGB) {
  return calcDifference(src, dest) / MAX_DIFFERENCE;
}


// Example
const color1: RGB = [1, 0, 0];
const color2: RGB = [64 / 255, 0, 0];
const color3: RGB = [1, 191 / 255, 0];

const dis1 = calcDistance(color1, color2);
const dis2 = calcDistance(color1, color3);

console.log(dis1, dis2);


export {
  MAX_DIFFERENCE as LAB_EUCLIDEAN_DISTANCE_MAX,
  calcDistance as calcLABEuclideanDistance
};

