type RGB = [number, number, number];
const WHITE_RELATIVE_RGB: RGB = [1, 1, 1];
const BLACK_RELATIVE_RGB: RGB = [0, 0, 0];


/** @value 0.20689655172413793 */
const n6d29 = 6 / 29;

/** @value 0.04280618311533888 */
const n6d29p2 = n6d29 * n6d29;

/** @value 0.008856451679035631 */
const n6d29p3 = n6d29p2 * n6d29;

/** @value (JS)23.361111111111107 => (JAVA)23.36111111111111 */
const n29d6 = 23.36111111111111; // 29 / 6

/** @value 0.13793103448275862 */
const n4d29 = 4 / 29;

/** @value 0.3333333333333333 */
const n1d3 = 1 / 3;

// 定数は省略
// const k1 = 1;
// const kc = 1;
// const kh = 1;


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
  return [getX(r, g, b), getY(r, g, b), getZ(r, g, b)];
}


function calcTriangle(t: number): number {
  return (t > n6d29p3)
    ? Math.pow(t, n1d3)
    : n1d3 * n29d6 * t + n4d29;
}

const WHITE_DIFFERENCE = rgb2xyz(WHITE_RELATIVE_RGB);
function xyz2lab(xyz: RGB): RGB {
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

function hypot(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}

function pow2(a: number){
  return a * a;
}

function pow7(a: number){
  return a * a * a * a * a * a * a;
}
