import { polarToCartesian, inverseLerp } from "helpers/math_helpers";
import { buildGalaxy } from "galaxy_builder";
import * as easing from "helpers/easing_helpers";

const starTypes = ["hypergiant", "supergiant", "giant", "standard", "dwarf"];
const starColors = ["blue", "blueWhite", "white", "yellowWhite", "yellow", "lightOrange", "orangeRed", "red"];

let config = {
  // structure
  rngSeed: 1000,
  galaxyRadius: 10000,
  starCount: 10000,
  spiralArms: 3,
  spiralCurve: 0.4,
  coreDensity: 2.3,
  armSpread: 1.3,
  armDensity: 5.5,

  // star sizes
  sizeEasing: "easeInCubic",

  hypergiantSize: 3,
  hypergiantMin: 5,
  hypergiantMax: 10,

  supergiantSize: 2.5,
  supergiantMin: 5,
  supergiantMax: 20,

  giantSize: 2,
  giantMin: 10,
  giantMax: 5,

  standardSize: 1.5,
  standardMin: 100,
  standardMax: 50,

  dwarfSize: 1,
  dwarfMin: 10,
  dwarfMax: 100,

  // star colors

  colorEasing: "easeOutCubic",

  blueColor: "#4444FF",
  blueMin: 100,
  blueMax: 500,

  blueWhiteColor: "#A7D8FF",
  blueWhiteMin: 200,
  blueWhiteMax: 3000,

  whiteColor: "#FFFFFF",
  whiteMin: 1000,
  whiteMax: 2000,

  yellowWhiteColor: "#FFFFAA",
  yellowWhiteMin: 500,
  yellowWhiteMax: 120,

  yellowColor: "#FFFF22",
  yellowMin: 1000,
  yellowMax: 10,

  lightOrangeColor: "#FFC78E",
  lightOrangeMin: 2000,
  lightOrangeMax: 10,

  orangeRedColor: "#FFA622",
  orangeRedMin: 2000,
  orangeRedMax: 10,

  redColor: "#DD2222",
  redMin: 3,
  redMax: 2,

  // fx
  spaceColor: "#000000",

  // camera
  zoom: 1
};

let stars = [];

const mainCanvas = document.getElementById("main-canvas");
const mainCanvasContext = mainCanvas.getContext("2d");

function updateInputs() {
  Array.from(document.getElementsByTagName("select")).forEach(element => {
    Object.keys(easing).forEach(key => {
      const option = document.createElement("option");
      option.text = key;
      element.add(option);
    });
  });

  Object.keys(config).forEach(key => {
    const element = document.getElementById(key);
    element.value = config[key];
  });
}

function updateStars() {
  stars = buildGalaxy(config, starWeights(starTypes, "sizeEasing"), starWeights(starColors, "colorEasing"));
}

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
  mainCanvasContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  stars.forEach(star => renderStar(star, mainCanvasContext));
}

function subscribeToInputChanges() {
  Array.from(document.getElementsByTagName("input"))
    .concat(Array.from(document.getElementsByTagName("select")))
    .forEach(element => {
      element.addEventListener("change", ev => {
        document.getElementById("scene").style.backgroundColor = config.spaceColor;
        if (ev.target.type === "checkbox") {
          config[ev.target.id] = ev.target.checked;
        } else if (ev.target.type === "number") {
          config[ev.target.id] = parseFloat(ev.target.value);
        } else {
          config[ev.target.id] = ev.target.value;
        }

        if (ev.target.dataset.rerender) {
          updateStars();
          render();
        }
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
  const size = config[`${star.size}Size`] * window.devicePixelRatio;
  const color = config[`${star.type}Color`];
  context.fillStyle = color;
  context.fillRect(x - size / 2, y - size / 2, size, size);
}

updateInputs();
updateStars();
render();
subscribeToInputChanges();
