import { polarToCartesian, inverseLerp, rotate, rotationMatrix } from "helpers/math_helpers";
import { buildGalaxy } from "galaxy_builder";
import * as easing from "helpers/easing_helpers";
import debounce from "lodash.debounce";

const blending = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "hue",
  "saturation",
  "color",
  "luminosity"
];
const starTypes = ["hypergiant", "supergiant", "giant", "standard", "dwarf"];
const starColors = ["blue", "blueWhite", "white", "yellowWhite", "yellow", "lightOrange", "orangeRed", "red"];

let config = {
  // structure
  rngSeed: 1000,
  galaxyRadius: 10000,
  starCount: 15000,
  spiralArms: 3,
  spiralCurve: 0.4,
  coreDensity: 2.3,
  armSpread: 1.3,
  armDensity: 4.5,

  // star sizes
  sizeEasing: "easeInCubic",

  hypergiantSize: 2.5,
  hypergiantMin: 5,
  hypergiantMax: 10,

  supergiantSize: 2.25,
  supergiantMin: 5,
  supergiantMax: 20,

  giantSize: 1.5,
  giantMin: 10,
  giantMax: 5,

  standardSize: 1,
  standardMin: 100,
  standardMax: 50,

  dwarfSize: 0.75,
  dwarfMin: 10,
  dwarfMax: 100,

  // star colors

  colorEasing: "easeInCubic",

  blueColor: "#F4FF6D",
  blueMin: 100,
  blueMax: 500,

  blueWhiteColor: "#BEFDFF",
  blueWhiteMin: 200,
  blueWhiteMax: 3000,

  whiteColor: "#EFF8FF",
  whiteMin: 1000,
  whiteMax: 2000,

  yellowWhiteColor: "#FFFFAA",
  yellowWhiteMin: 500,
  yellowWhiteMax: 120,

  yellowColor: "#FFF9F0",
  yellowMin: 1000,
  yellowMax: 10,

  lightOrangeColor: "#EBFCFF",
  lightOrangeMin: 2000,
  lightOrangeMax: 10,

  orangeRedColor: "#94FDFF",
  orangeRedMin: 2000,
  orangeRedMax: 10,

  redColor: "#DDC91C",
  redMin: 3,
  redMax: 2,

  // fx
  spaceColor: "#050212",

  canvas0Displayed: true,
  canvas0Alpha: 1,
  canvas0Bright: 100,
  canvas0Blur: 10,
  canvas0Blend: "normal",

  canvas1Displayed: true,
  canvas1Alpha: 1,
  canvas1Bright: 100,
  canvas1Blur: 5,
  canvas1Blend: "lighten",

  canvas2Displayed: true,
  canvas2Alpha: 1,
  canvas2Bright: 100,
  canvas2Blur: 1,
  canvas2Blend: "normal",

  canvas3Displayed: true,
  canvas3Alpha: 1,
  canvas3Bright: 100,
  canvas3Blur: 20,
  canvas3Blend: "overlay",

  // camera
  zoom: 1,
  xRotation: 0,
  yRotation: 0,
  zRotation: 0
};

let stars = [];

const mainCanvas = document.getElementById("canvas0");
const mainCanvasContext = mainCanvas.getContext("2d");
const canvases = Array.from(document.getElementsByTagName("canvas"));

canvases.forEach(canvas => {
  canvas.width *= window.devicePixelRatio;
  canvas.height *= window.devicePixelRatio;
});

function updateInputs() {
  Array.from(document.getElementsByClassName("easing")).forEach(element => {
    Object.keys(easing).forEach(key => {
      const option = document.createElement("option");
      option.text = key;
      element.add(option);
    });
  });

  Array.from(document.getElementsByClassName("blending")).forEach(element => {
    blending.forEach(key => {
      const option = document.createElement("option");
      option.text = key;
      element.add(option);
    });
  });

  Object.keys(config).forEach(key => {
    const element = document.getElementById(key);
    if (element.type === "checkbox") {
      element.checked = config[key];
    } else {
      element.value = config[key];
    }
  });
}

function updateStars() {
  stars = buildGalaxy(config, starWeights(starTypes, "sizeEasing"), starWeights(starColors, "colorEasing"));
}

function updateStarsAndRenderNonOptimized() {
  updateStars();
  render();
}

let updateStarsAndRender = debounce(updateStarsAndRenderNonOptimized, 100);

function starWeights(types, easingString) {
  return {
    ease: easing[config[easingString]],
    min: types.reduce((hash, key) => {
      hash[key] = config[`${key}Min`];
      return hash;
    }, {}),
    max: types.reduce((hash, key) => {
      hash[key] = config[`${key}Max`];
      return hash;
    }, {})
  };
}

function render() {
  document.getElementById("scene").style.backgroundColor = config.spaceColor;
  mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  renderCanvas(mainCanvasContext, mainCanvas, 0);
  let matrix = rotationMatrix(config.xRotation, config.yRotation, config.zRotation);
  stars.forEach(star => renderStar(star, mainCanvasContext, matrix));

  for (let i = 1; i < canvases.length; i++) {
    let canvas = canvases[i];
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    if (config[`canvas${i}Displayed`]) {
      renderCanvas(ctx, canvas, i);
      ctx.drawImage(mainCanvas, 0, 0);
    }
  }
}

function renderCanvas(ctx, canvas, i) {
  canvas.style.mixBlendMode = config[`canvas${i}Blend`];
  canvas.style.opacity = config[`canvas${i}Alpha`];
  canvas.style.filter = `blur(${config[`canvas${i}Blur`]}px) brightness(${config[`canvas${i}Bright`]}%)`;
}

function subscribeToInputChanges() {
  Array.from(document.getElementsByTagName("input"))
    .concat(Array.from(document.getElementsByTagName("select")))
    .forEach(element => {
      element.addEventListener("change", ev => {
        if (ev.target.type === "checkbox") {
          config[ev.target.id] = ev.target.checked;
        } else if (ev.target.type === "number") {
          config[ev.target.id] = parseFloat(ev.target.value);
        } else {
          config[ev.target.id] = ev.target.value;
        }

        if (ev.target.dataset.rerender) {
          updateStarsAndRender();
        }
      });
    });
}

function renderStar(star, context, rotationMatrix) {
  const cartesian = polarToCartesian(star.pos.r, star.pos.t);
  var { x, y, z } = rotate({ x: cartesian.x, y: cartesian.y, z: 0 }, rotationMatrix);
  const xInverseLerpValue = inverseLerp(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, x);
  const yInverseLerpValue = inverseLerp(-config.galaxyRadius / config.zoom, config.galaxyRadius / config.zoom, y);
  x = 800 * xInverseLerpValue * window.devicePixelRatio;
  y = 800 * yInverseLerpValue * window.devicePixelRatio;
  const size = config[`${star.size}Size`] * window.devicePixelRatio;
  const color = config[`${star.type}Color`];
  context.fillStyle = color;
  context.fillRect(x - size / 2, y - size / 2, size, size);
}

updateInputs();
updateStars();
render();
subscribeToInputChanges();
