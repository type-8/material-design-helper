type RGB = [number, number, number];
const WHITE_RELATIVE_RGB: RGB = [1, 1, 1];
const BLACK_RELATIVE_RGB: RGB = [0, 0, 0];


/** @value 1.7576607323371596 */
const MAX_DIFFERENCE = calcDifference(WHITE_RELATIVE_RGB, BLACK_RELATIVE_RGB);


function getX(r: number, g: number, b: number): number {
  return 0.4124 * r + 0.3576 * g + 0.1805 * b;
}

function getY(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getZ(r: number, g: number, b: number): number {
  return 0.0193 * r + 0.1192 * g + 0.9505 * b;
}

function rgb2xyz([r, g, b]: RGB): RGB {
  return [getX(r, g, b), getY(r, g, b), getZ(r, b, b)];
}


function calcDifference(src: RGB, dest: RGB) {
  src = rgb2xyz(src);
  dest = rgb2xyz(dest);

  const x = src[0] - dest[0];
  const y = src[1] - dest[1];
  const z = src[2] - dest[2];

  return Math.sqrt(x * x + y * y + z * z);
}


function calcDistance(src: RGB, dest: RGB) {
  return calcDifference(src, dest) / MAX_DIFFERENCE;
}


// Example
const color1: RGB = [255 / 255, 0, 0];
const color2: RGB = [64 / 255, 0, 0];
const color3: RGB = [1, 191 / 255, 0];

const dis1 = calcDistance(color1, color2);
const dis2 = calcDistance(color1, color3);
console.log(dis1, dis2); // 0.19789181869423664 0.3445191004155532
// Javaでは、「x, y, z」を計算した時に発生する誤差により微妙に値が違う

export {
  MAX_DIFFERENCE as XYZ_EUCLIDEAN_MAX_DISTANCE,
  calcDifference as calcXYZEuclideanDifference,
  calcDistance as calcXYZEuclideanDistance
};
