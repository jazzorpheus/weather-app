// Temperature-Color Converter
import * as d3 from "d3";

// Temp-color converter returns rgba
export default function tempToColor(temp, alpha = 1.0) {
  // Define the reversed color scale using d3.interpolateRdYlBu
  const colorScale = d3.scaleSequential(d3.interpolateRdYlBu).domain([50, -30]);

  // Get the RGB color
  const rgbColor = d3.color(colorScale(temp));

  // Convert to RGBA
  const rgbaColor = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${alpha})`;

  return rgbaColor;
}

// * Color-Temp Spectrum:

// 50 deg
// rgba(165, 0, 38, 1)

// 45 deg
// rgba(195, 31, 40, 1)

// 40 deg
// rgba(221, 64, 48, 1)

// 35 deg
// rgba(238, 102, 64, 1)

// 30 deg
// rgba(248, 141, 82, 1)

// 25 deg
// rgba(254, 234, 162, 1)

// 20 deg
// rgba(254, 234, 162, 1)

// 15 deg
// rgba(254, 234, 162, 1)

// 10 deg
// rgba(250, 248, 193, 1)

// 5 deg
// rgba(234, 247, 224, 1)

// 0 deg
// rgba(209, 235, 239, 1)

// -5 deg
// rgba(177, 218, 234, 1)

// -10 deg
// rgba(144, 194, 221, 1)

// -15 deg
// rgba(111, 165, 205, 1)

// -20 deg
// rgba(83, 130, 187, 1)

// -25 deg
// rgba(63, 93, 168, 1)

// -30 deg
// rgba(49, 54, 149, 1)
