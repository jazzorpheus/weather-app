export default function convertWindSpeed(windSpeed) {
  if (!windSpeed) return null;

  const mphVal = (60 ** 2 * (windSpeed / 1609.34)).toFixed(1);
  let intensityIdx;
  if (mphVal >= 0 && mphVal < 10) {
    intensityIdx = 1;
  } else if (mphVal >= 10 && mphVal < 20) {
    intensityIdx = 2;
  } else if (mphVal >= 20 && mphVal < 30) {
    intensityIdx = 3;
  } else if (mphVal >= 30 && mphVal < 40) {
    intensityIdx = 4;
  } else if (mphVal >= 40 && mphVal < 50) {
    intensityIdx = 5;
  } else if (mphVal >= 50 && mphVal < 60) {
    intensityIdx = 6;
  } else if (mphVal >= 60 && mphVal < 70) {
    intensityIdx = 7;
  } else if (mphVal >= 70 && mphVal < 80) {
    intensityIdx = 8;
  } else if (mphVal >= 80 && mphVal < 90) {
    intensityIdx = 9;
  } else if (mphVal > 90) {
    intensityIdx = 10;
  } else {
    intensityIdx = 0;
  }

  return {
    intensityIdx,
    mphVal,
  };
}
