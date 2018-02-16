import { polarToCartesian, inverseLerp } from "helpers/math_helpers";
import { buildGalaxy } from "galaxy_builder";

let config = {
  rngSeed: 1000,
  galaxyRadius: 10000,
  starCount: 5000,
  spiralArms: 3,
  spiralCurve: 0.3,
  coreDensity: 1.3,
  armSpread: 0.9,
  armDensity: 3.75,
  spaceColor: "#000000",
  zoom: 0.75
};

let stars = [];

const mainCanvas = document.getElementById("main-canvas");
const mainCanvasContext = mainCanvas.getContext("2d");

function updateInputs() {
  Object.keys(config).forEach(key => {
    document.getElementById(key).value = config[key];
  });
}

function updateStars() {
  stars = buildGalaxy(config);
}

function render() {
  mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  stars.forEach(star => renderStar(star, mainCanvasContext));
}

function subscribeToInputChanges() {
  Array.from(document.getElementsByTagName("input")).forEach(element => {
    element.addEventListener("change", ev => {
      document.getElementById("scene").style.backgroundColor = config.spaceColor;
      config[ev.target.id] = ev.target.value;
      updateStars();
      render();
    });
  });
}

function renderStar(star, context) {
  let { x, y } = star.pos;
  if (x === undefined && y === undefined) {
    const cartesian = polarToCartesian(star.pos.r, star.pos.t);
    x = cartesian.x;
    y = cartesian.y;
  }
  const xInverseLerpValue = inverseLerp(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, x);
  const yInverseLerpValue = inverseLerp(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, y);
  x = 800 * xInverseLerpValue * window.devicePixelRatio;
  y = 800 * yInverseLerpValue * window.devicePixelRatio;
  // const size = STAR_SIZE_MAPPINGS[star.size] * window.devicePixelRatio;
  // const color = STAR_COLOR_MAPPINGS[star.type];
  const size = 1;
  const color = "#fff";
  context.fillStyle = color;
  context.fillRect(x - size / 2, y - size / 2, size, size);
}

updateInputs();
updateStars();
render();
subscribeToInputChanges();
//
//   starTypesWeights: {
//     ease: easeOutCubic,
//     min: {
//       blue: 100,
//       blueWhite: 200,
//       white: 1000,
//       yellowWhite: 500,
//       yellow: 1000,
//       lightOrange: 2000,
//       orangeRed: 2000,
//       red: 3
//     },
//     max: {
//       blue: 500,
//       blueWhite: 3000,
//       white: 2000,
//       yellowWhite: 120,
//       yellow: 10,
//       lightOrange: 10,
//       orangeRed: 10,
//       red: 2
//     }
//   },
//   starSizeWeights: {
//     ease: linear,
//     min: {
//       hypergiant: 10,
//       supergiant: 5,
//       giant: 10,
//       standard: 100,
//       dwarf: 10
//     },
//     max: {
//       hypergiant: 10,
//       supergiant: 20,
//       giant: 5,
//       standard: 50,
//       dwarf: 100
//     }
//   }
// };
