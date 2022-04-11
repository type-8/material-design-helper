type RGB = [number, number, number];


/** @value 1.7320508075688772 */
const MAX = Math.sqrt(3);


function calcDistance(src: RGB, dest: RGB) {
  const r = src[0] - dest[0];
  const g = src[1] - dest[1];
  const b = src[2] - dest[2]; 

  // √(r^2 + g^2 + b^2) / √3
  return Math.sqrt(r * r + g * g + b * b) / MAX;
}


// Example
const color1: RGB = [1, 0, 0];
const color2: RGB = [64 / 255, 0, 0];
const color3: RGB = [1, 191 / 255, 0];

const dis1 = calcDistance(color1, color2);
const dis2 = calcDistance(color1, color3);
console.log(dis1, dis2); // 0.43244667221654326 0.43244667221654326


export {
  MAX as RGB_EUCLIDEAN_DISTANCE_MAX,
  calcDistance as calcRGBEuclideanDistance
};

