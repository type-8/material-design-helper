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


const pi2 = Math.PI * 2;

const n25p7 = Math.pow(25, 7);

const rad = Math.PI / 180;

const rad6 = 6 * rad;

const rad25 = 25 * rad;

const rad30 = 30 * rad;

const rad60 = 60 * rad;

const rad63 = 63 * rad;

const rad275 = 275 * rad;


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

const MAX_DIFFERENCE = calcDifference(WHITE_RELATIVE_RGB, BLACK_RELATIVE_RGB);

function calcDifference(src: RGB, dest: RGB): number {
  const [l1, a1, b1] = rgb2lab(src);
  const [l2, a2, b2] = rgb2lab(dest);

  const dld = l2 - l1;
  const lb = (l1 + l2) / 2;

  const cs1 = hypot(a1, b1);
  const cs2 = hypot(a2, b2);
  const cb = (cs1 + cs2) / 2;
  const cb7 = pow7(cb);
  const ad1 = a1 + a1 / 2 * (1 - Math.sqrt(cb7 / (cb7 + n25p7)));
  const ad2 = a2 + a2 / 2 * (1 - Math.sqrt(cb7 / (cb7 + n25p7)));

  const cd1 = hypot(ad1, b1);
  const cd2 = hypot(ad2, b2);
  const cbd = (cd1 + cd2) / 2;
  const cbd7 = pow7(cbd);

  const dcd = (cd2 - cd1);

  let hd1 = (b1 === 0 && ad1 === 0) ? 0 : Math.atan2(b1, ad1);
  if(hd1 < 0) {
    hd1 += pi2;
  }

  let hd2 = (b2 === 0 && ad2 === 0) ? 0 : Math.atan2(b2, ad2);
  if(hd2 < 0) {
    hd2 += pi2;
  }

  let dhd = hd2 - hd1;
  if((cd1 * cd2) === 0) {
      dhd = 0;

  } else if (Math.abs(hd1 - hd2) > Math.PI) {
    (hd2 <= hd1)
      ? dhd += pi2
      : dhd -= pi2;
  }

  const dhhd = 2 * Math.sqrt(cd1 * cd2) * Math.sin(dhd / 2);
  let hhbd = 0;
  if((cd1 * cd2) !== 0){
    hhbd = (Math.abs(hd1 - hd2) > Math.PI)
      ? (hd1 + hd2 + pi2) / 2
      : (hd1 + hd2) / 2;
  }

  const tt = 1
          - 0.17 * Math.cos(hhbd - rad30)
          + 0.24 * Math.cos(2 * hhbd)
          + 0.32 * Math.cos(3 * hhbd + rad6)
          - 0.20 * Math.cos(4 * hhbd - rad63);

  const lbs50p2 = pow2(lb - 50);
  const ssl = 1 + (0.015 * lbs50p2) / Math.sqrt(20 + lbs50p2);
  const ssc = 1 + 0.045 * cbd;
  const ssh = 1 + 0.015 * cbd * tt;

  const rrt = -2 * Math.sqrt(cbd7 / (cbd7 + n25p7)) * Math.sin(rad60 * Math.exp(-pow2((hhbd - rad275) / rad25)));

  const d = pow2(dld / (1 * ssl))
          + pow2(dcd / (1 * ssc))
          + pow2(dhhd / (1 * ssh))
          + rrt * (dcd / (1 * ssc)) * (dhhd / (1 * ssh));

  return Math.sqrt(d);
}

function calcDistance(src: RGB, dest: RGB): number {
  return calcDifference(src, dest) / MAX_DIFFERENCE;  
}


const color1: RGB = [1, 0, 0];
const color2: RGB = [64 / 255, 0, 0];
const color3: RGB = [1, 191 / 255, 0];

const dis1 = calcDistance(color1, color2);
const dis2 = calcDistance(color1, color3);
console.log(dis1, dis2); // 0.24093259394687105 0.5480665080781703


export {
  MAX_DIFFERENCE as LAB_EUCLIDEAN_DISTANCE_MAX,
  calcDistance as calcLABEuclideanDistance
};
